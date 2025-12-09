import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Globe, DollarSign, Cpu, UploadCloud } from 'lucide-react';
import './Apply.css';

import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, addDoc, query, where, getDocs, serverTimestamp, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserService } from '../firebase/src/firebaseServices';

interface Job {
  id: string;
  title: string;
  location: string;
  remote: string;
  type: string;
  salary: string;
  tech: string;
  posterId?: string;
  posterName?: string;
  company?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvFileName?: string;
  cvBase64?: string;
  cvSize?: number;
  cvType?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  cvFile?: string;
}

function JobApplicationPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cvFileName: '',
    cvBase64: ''
  });

  const [fileName, setFileName] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');


  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        const jobRef = doc(db, 'jobs', jobId);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          const jobData = jobSnap.data() as Omit<Job, 'id'>;
          setJobDetails({ id: jobSnap.id, ...jobData });
        } else {
          setJobDetails(null);
        }
      } catch (error) {
        console.error("Error fetching job details: ", error);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) { 
        setErrors({ cvFile: 'File size must be less than 1MB.' });
        setFileName('');
        return;
      }

      setFileName(file.name);
      setErrors(prev => ({ ...prev, cvFile: undefined }));

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({
          ...prev,
          cvFileName: file.name,
          cvBase64: base64String,
          cvSize: file.size,
          cvType: file.type
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.cvBase64) newErrors.cvFile = 'CV is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || !jobDetails) return;

    setSubmissionStatus('submitting');

    try {
      // Duplicate protection
      if (user?.uid) {
        const q1 = query(collection(db, 'applications'), where('jobId', '==', jobDetails.id), where('userId', '==', user.uid));
        const r1 = await getDocs(q1);
        if (!r1.empty) {
          alert('You have already applied to this job.');
          setSubmissionStatus('idle');
          return;
        }
      } else if (formData.email) {
        const q2 = query(collection(db, 'applications'), where('jobId', '==', jobDetails.id), where('email', '==', formData.email));
        const r2 = await getDocs(q2);
        if (!r2.empty) {
          alert('This email has already applied to this job.');
          setSubmissionStatus('idle');
          return;
        }
      }

      const emailDomain = formData.email?.split('@')[1]?.toLowerCase() || null;
      const nameLower = formData.fullName?.toLowerCase() || '';
      let userSnapshot: any = null;
      if (user?.uid) {
        try {
          userSnapshot = await UserService.getUserData(user.uid);
        } catch {}
      }

      const docRef = await addDoc(collection(db, 'applications'), {
        jobId: jobDetails.id,
        jobTitle: jobDetails.title,
        jobCompany: jobDetails.company || null,
        posterId: jobDetails.posterId || null,
        posterName: jobDetails.posterName || null,
        userId: user?.uid || null,
        fullName: formData.fullName,
        email: formData.email,
        emailDomain,
        phone: formData.phone || '',
        coverLetter: formData.coverLetter,
        cvFileName: formData.cvFileName,
        cvBase64: formData.cvBase64,
        cvMeta: {
          size: formData.cvSize || null,
          type: formData.cvType || null,
        },
        appliedAt: serverTimestamp(),
        status: 'pending',
        viewed: false,
        stage: 'applied',
        statusHistory: [
          { status: 'applied', at: new Date() }
        ],
        score: null,
        notes: null,
        submittedByAuth: !!user?.uid,
        userSnapshot: userSnapshot ? {
          uid: userSnapshot.uid || user?.uid || null,
          displayName: userSnapshot.displayName || null,
          photoURL: userSnapshot.photoURL || null,
          role: userSnapshot.role || null,
          location: userSnapshot.location || null,
          firstName: userSnapshot.firstName || null,
          lastName: userSnapshot.lastName || null,
          skills: userSnapshot.skills || [],
        } : null,
        nameLower,
        lastUpdatedAt: serverTimestamp(),
      });

      // Update counters on job doc
      try {
        const updateData: any = {
          applicantsCount: increment(1),
          lastApplicationAt: serverTimestamp(),
        };
        if (user?.uid) {
          updateData.applicantsUserIds = arrayUnion(user.uid);
        } else if (formData.email) {
          updateData.applicantsUserIds = arrayUnion(`email:${formData.email}`);
        }
        if (emailDomain) {
          updateData.applicantsEmailDomains = arrayUnion(emailDomain);
        }
        await updateDoc(doc(db, 'jobs', jobDetails.id), updateData);
      } catch {}

      if (user?.uid) {
        try {
          await UserService.incrementField(user.uid, 'appliedJobs');
        } catch {}
      }

      setSubmissionStatus('success');

    
      navigate('/confirmation', {
        state: {
          jobDetails,
          formData,
          applicationId: `APP-${docRef.id.substring(0, 8).toUpperCase()}`
        }
      });

    } catch (error) {
      console.error("Error submitting application: ", error);
      setSubmissionStatus('error');
      alert("Failed to submit application. Please try again.");
      setSubmissionStatus('idle');
    }
  };

  if (!jobDetails) {
    return (
      <div className="job-application-page">
        <div className="container">
          <h2>Job Not Found</h2>
          <p>The job you are looking for does not exist or may have been filled.</p>
          <Link to="/jobs" className="back-link">
            <ArrowLeft size={18} /> Back to Job Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="job-application-page">
      <div className="container">
        <Link to="/jobs" className="back-link">
          <ArrowLeft size={18} /> Back to Job Listings
        </Link>

        <div className="application-header">
          <h1>Apply for {jobDetails.title}</h1>
          <div className="job-meta">
            <span><MapPin size={16} /> {jobDetails.location}</span>
            <span><Globe size={16} /> {jobDetails.remote}</span>
            <span><Briefcase size={16} /> {jobDetails.type}</span>
            <span><DollarSign size={16} /> {jobDetails.salary} / month</span>
          </div>
          <div className="job-tech">
            <Cpu size={16} />
            <strong>Tech Stack:</strong> {jobDetails.tech}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Personal Info */}
          <div className="ApplyFormsection">
            <h3>Personal Information</h3>
            <div className="ApplyFormgrid">
              <div className="ApplyFormgroup">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>
              <div className="ApplyFormgroup">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="ApplyFormgroup">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          
          <div className="ApplyFormsection">
            <h3>Resume / CV</h3>
            <div className="ApplyFormgroup">
              <label htmlFor="cvFile" className="file-upload-label">
                <UploadCloud size={20} />
                <span>{fileName ? fileName : 'Upload Your CV'}</span>
              </label>
              <input type="file" id="cvFile" name="cvFile" onChange={handleFileChange} accept=".pdf,.doc,.docx" hidden />
              {errors.cvFile && <span className="error-text">{errors.cvFile}</span>}
            </div>
            <p className="file-instructions">Accepted file types: PDF, DOC, DOCX. Max size: 1MB.</p>
          </div>

         
          <div className="ApplyFormsection">
            <h3>Cover Letter (Optional)</h3>
            <div className="ApplyFormgroup">
              <textarea id="coverLetter" name="coverLetter" rows={6} value={formData.coverLetter} onChange={handleInputChange}></textarea>
            </div>
          </div>

          <div className="ApplyFormactions">
            <button type="submit" className="submit-button" disabled={submissionStatus === 'submitting'}>
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobApplicationPage;
