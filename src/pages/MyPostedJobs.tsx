import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Briefcase, 
  Users, 
  Eye, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Edit,
  Search,
  Filter
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc,
  updateDoc,
  deleteDoc,
  orderBy 
} from 'firebase/firestore';
import './MyPostedJobs.css';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvFileName: string;
  cvBase64: string;
  appliedAt: any;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  remote: string;
  salary: string;
  tech: string;
  type: string;
  timestamp: any;
  applicationsCount?: number;
}

function MyPostedJobs() {
  const [user] = useAuthState(auth);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showApplications, setShowApplications] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyJobs();
    }
  }, [user]);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      
      const jobsList: Job[] = [];
      
      for (const jobDoc of snapshot.docs) {
        const jobData = { id: jobDoc.id, ...jobDoc.data() } as Job;
        
        // حساب عدد المتقدمين لكل وظيفة
        const appsRef = collection(db, 'applications');
        const appsQuery = query(appsRef, where('jobId', '==', jobDoc.id));
        const appsSnapshot = await getDocs(appsQuery);
        
        jobData.applicationsCount = appsSnapshot.size;
        jobsList.push(jobData);
      }
      
      setJobs(jobsList);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId: string) => {
    try {
      setLoading(true);
      const appsRef = collection(db, 'applications');
      const q = query(appsRef, where('jobId', '==', jobId), orderBy('appliedAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const appsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];
      
      setApplications(appsList);
      setFilteredApplications(appsList);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    // فلترة بالبحث
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة بالحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleViewApplications = (job: Job) => {
    setSelectedJob(job);
    setShowApplications(true);
    fetchApplications(job.id);
  };

  const handleUpdateStatus = async (applicationId: string, newStatus: Application['status']) => {
    try {
      const appRef = doc(db, 'applications', applicationId);
      await updateDoc(appRef, { status: newStatus });
      
      // تحديث الحالة محلياً
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDownloadCV = (cvBase64: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = cvBase64;
    link.download = fileName;
    link.click();
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job? This will also delete all applications.')) {
      return;
    }

    try {
      // حذف كل التقديمات المرتبطة بالوظيفة
      const appsRef = collection(db, 'applications');
      const appsQuery = query(appsRef, where('jobId', '==', jobId));
      const appsSnapshot = await getDocs(appsQuery);
      
      const deletePromises = appsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // حذف الوظيفة
      await deleteDoc(doc(db, 'jobs', jobId));
      
      setJobs(prev => prev.filter(job => job.id !== jobId));
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    const badges = {
      pending: { icon: <Clock size={14} />, text: 'Pending', class: 'status-pending' },
      reviewed: { icon: <Eye size={14} />, text: 'Reviewed', class: 'status-reviewed' },
      accepted: { icon: <CheckCircle size={14} />, text: 'Accepted', class: 'status-accepted' },
      rejected: { icon: <XCircle size={14} />, text: 'Rejected', class: 'status-rejected' }
    };
    return badges[status];
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="my-posted-jobs-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!showApplications) {
    return (
      <div className="my-posted-jobs-container">
        <div className="page-header">
          <Link to="/jobs" className="back-link">
            <ArrowLeft size={20} /> Back to Jobs
          </Link>
          <h1>My Posted Jobs</h1>
          <p>Manage your job postings and review applications</p>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <Briefcase size={24} />
            <div>
              <h3>{jobs.length}</h3>
              <p>Total Jobs Posted</p>
            </div>
          </div>
          <div className="stat-card">
            <Users size={24} />
            <div>
              <h3>{jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0)}</h3>
              <p>Total Applications</p>
            </div>
          </div>
          <div className="stat-card">
            <CheckCircle size={24} />
            <div>
              <h3>{jobs.filter(job => (job.applicationsCount || 0) > 0).length}</h3>
              <p>Active Jobs</p>
            </div>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={64} />
            <h2>No Jobs Posted Yet</h2>
            <p>Start posting jobs to receive applications</p>
            <Link to="/jobs" className="btn-primary">Post a Job</Link>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map(job => (
              <div key={job.id} className="job-card-posted">
                <div className="job-card-header">
                  <div className="job-title-section">
                    <h3>{job.title}</h3>
                    <span className="company-name">{job.company}</span>
                  </div>
                  <div className="job-actions">
                    <button 
                      className="btn-icon"
                      onClick={() => handleDeleteJob(job.id)}
                      title="Delete Job"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="job-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="detail-item">
                    <Briefcase size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>{job.salary}/yr</span>
                  </div>
                </div>

                <div className="tech-stack">
                  <strong>Tech:</strong> {job.tech}
                </div>

                <div className="job-footer">
                  <div className="applications-count">
                    <Users size={18} />
                    <span>{job.applicationsCount || 0} Applications</span>
                  </div>
                  <button 
                    className="btn-view-applications"
                    onClick={() => handleViewApplications(job)}
                    disabled={!job.applicationsCount}
                  >
                    <Eye size={16} /> View Applications
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // عرض التقديمات
  return (
    <div className="my-posted-jobs-container">
      <div className="page-header">
        <button 
          className="back-link"
          onClick={() => {
            setShowApplications(false);
            setSelectedJob(null);
            setApplications([]);
            setSearchTerm('');
            setStatusFilter('all');
          }}
        >
          <ArrowLeft size={20} /> Back to My Jobs
        </button>
        <h1>Applications for: {selectedJob?.title}</h1>
        <p>{applications.length} total applications</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filters">
          <button 
            className={statusFilter === 'all' ? 'active' : ''}
            onClick={() => setStatusFilter('all')}
          >
            All ({applications.length})
          </button>
          <button 
            className={statusFilter === 'pending' ? 'active' : ''}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({applications.filter(a => a.status === 'pending').length})
          </button>
          <button 
            className={statusFilter === 'reviewed' ? 'active' : ''}
            onClick={() => setStatusFilter('reviewed')}
          >
            Reviewed ({applications.filter(a => a.status === 'reviewed').length})
          </button>
          <button 
            className={statusFilter === 'accepted' ? 'active' : ''}
            onClick={() => setStatusFilter('accepted')}
          >
            Accepted ({applications.filter(a => a.status === 'accepted').length})
          </button>
          <button 
            className={statusFilter === 'rejected' ? 'active' : ''}
            onClick={() => setStatusFilter('rejected')}
          >
            Rejected ({applications.filter(a => a.status === 'rejected').length})
          </button>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <Users size={64} />
          <h2>No Applications Found</h2>
          <p>No applications match your filters</p>
        </div>
      ) : (
        <div className="applications-list">
          {filteredApplications.map(app => {
            const statusBadge = getStatusBadge(app.status);
            return (
              <div key={app.id} className="application-card">
                <div className="application-header">
                  <div className="applicant-info">
                    <div className="applicant-avatar">
                      {app.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3>{app.fullName}</h3>
                      <p className="applied-date">
                        <Calendar size={14} />
                        Applied {new Date(app.appliedAt.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`status-badge ${statusBadge.class}`}>
                    {statusBadge.icon}
                    {statusBadge.text}
                  </span>
                </div>

                <div className="application-details">
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={16} />
                      <a href={`mailto:${app.email}`}>{app.email}</a>
                    </div>
                    {app.phone && (
                      <div className="contact-item">
                        <Phone size={16} />
                        <a href={`tel:${app.phone}`}>{app.phone}</a>
                      </div>
                    )}
                  </div>

                  {app.coverLetter && (
                    <div className="cover-letter">
                      <strong>Cover Letter:</strong>
                      <p>{app.coverLetter}</p>
                    </div>
                  )}

                  <div className="application-actions">
                    <button 
                      className="btn-download"
                      onClick={() => handleDownloadCV(app.cvBase64, app.cvFileName)}
                    >
                      <Download size={16} /> Download CV
                    </button>

                    <div className="status-actions">
                      {app.status !== 'reviewed' && (
                        <button 
                          className="btn-status reviewed"
                          onClick={() => handleUpdateStatus(app.id, 'reviewed')}
                        >
                          <Eye size={16} /> Mark Reviewed
                        </button>
                      )}
                      {app.status !== 'accepted' && (
                        <button 
                          className="btn-status accepted"
                          onClick={() => handleUpdateStatus(app.id, 'accepted')}
                        >
                          <CheckCircle size={16} /> Accept
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button 
                          className="btn-status rejected"
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyPostedJobs;