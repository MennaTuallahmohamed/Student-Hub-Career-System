import { useState, useEffect } from 'react';
import {
  User, Briefcase, GraduationCap, Camera, Edit3, Download, Share2, Plus,
  CheckCircle, Clock, X, Target, Award, Users, Calendar, ExternalLink,
  Mail, MapPin, Phone, TrendingUp, Star, BookOpen, Save, AlertCircle,
  Eye, Heart, MessageCircle, Settings, Shield, Bell, Filter, Search,
  Grid, List, BarChart3, PieChart, FileText, Upload, Link2, Copy
} from 'lucide-react';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { UserService } from '../firebase/src/firebaseServices';

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaUser,
  FaBriefcase,
  FaBook,
  FaFileDownload,
  FaPencilAlt,
  FaSignOutAlt,
} from 'react-icons/fa';


// Interfaces
interface UserData {
  skills: string[];
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  location?: string;
  photoURL?: string | null;
  bio?: string;
  company?: string;
  appliedJobs?: number;
  connections?: number;
  coursesEnrolled?: number;
  cvUploaded?: boolean;
  createdAt?: any;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tech: string;
  type: string;
  remote: string;
  timestamp: any;
}

interface Application {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvFileBase64: string;
  cvFileName: string;
  appliedAt: any;
}


const formatDate = (date: any) => {
  if (!date) return '';
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};


const LoadingSpinner = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.spinnerWrapper}>
      <div style={styles.spinner}></div>
      <div style={styles.spinnerInner}></div>
    </div>
    <p style={styles.loadingText}>Loading your profile...</p>
  </div>
);


const StatCard = ({ icon, title, value, change, color }: any) => (
  <div style={{ ...styles.statCard, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
    <div style={styles.statContent}>
      <h3 style={styles.statTitle}>{title}</h3>
      <p style={styles.statValue}>{value.toLocaleString()}</p>
      {change && (
        <div style={styles.change}>
          <TrendingUp size={14} style={{ color: '#10b981' }} />
          <span style={styles.changeText}>+{change}%</span>
        </div>
      )}
    </div>
    <div style={{ ...styles.iconBox, background: color || '#3b82f6' }}>
      {icon}
    </div>
  </div>
);


const SkillTag = ({ skill, level, onRemove, isEditing }: any) => (
  <div style={styles.skillTagWrapper}>
    <span style={{
      ...styles.skillTag,
      background: level === 'Expert' ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                  level === 'Advanced' ? 'linear-gradient(90deg, #10b981, #059669)' :
                  level === 'Intermediate' ? 'linear-gradient(90deg, #3b82f6, #2563eb)' :
                  'linear-gradient(90deg, #6b7280, #4b5563)'
    }}>
      {skill}
      <span style={styles.skillLevel}>{level}</span>
      {isEditing && onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} style={styles.removeBtn} title='btn'>
          <X size={12} />
        </button>
      )}
    </span>
  </div>
);


const Modal = ({ isOpen, onClose, title, children, size = 'md' }: any) => {
  if (!isOpen) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={{
        ...styles.modal,
        width: size === 'lg' ? '90%' : size === 'sm' ? '60%' : '75%',
        maxWidth: size === 'lg' ? 800 : size === 'sm' ? 400 : 600
      }}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>{title}</h3>
          <button onClick={onClose} style={styles.closeBtn} title='btn'>
            <X size={24} />
          </button>
        </div>
        <div style={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};


const ProfileStrengthIndicator = ({ strength }: { strength: number }) => (
  <div style={styles.strengthContainer}>
    <div style={styles.strengthHeader}>
      <span style={styles.strengthLabel}>Profile Strength</span>
      <span style={styles.strengthValue}>{strength}%</span>
    </div>
    <div style={styles.strengthBar}>
      <div 
        style={{
          ...styles.strengthFill,
          width: `${strength}%`,
          background: strength >= 80 ? '#10b981' : strength >= 60 ? '#f59e0b' : '#ef4444'
        }}
      ></div>
    </div>
    <p style={styles.strengthTip}>
      {strength < 60 ? 'Add more skills and experience to improve your profile' :
       strength < 80 ? 'Great! Add certifications to reach 100%' :
       'Excellent profile! You\'re all set'}
    </p>
  </div>
);


function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<UserData>>({});
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

   const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setUserData(null);
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // ✅ تحديث الإحصائيات بناءً على البيانات الحقيقية
        await UserService.updateUserStats(user.uid);
        
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({ ...data, uid: user.uid } as UserData);
          setEditData({ ...data });
          // تحميل الكورسات المسجلة
          setEnrolledCourses(data.registeredCourses || []);
          setError(null);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

 
  const handleSave = async () => {
    if (!userData || !editData) return;
    try {
      const userRef = doc(db, 'users', userData.uid);
      await updateDoc(userRef, editData as any);
      setUserData({ ...userData, ...editData });
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save changes');
    }
  };


  const handleImageUpload = async (file: File) => {
   
    const reader = new FileReader();
    reader.onload = () => {
      setUserData(prev => prev ? { ...prev, photoURL: reader.result as string } : null);
      setShowUploadModal(false);
      setSuccess('Profile picture updated!');
      setTimeout(() => setSuccess(null), 3000);
    };
    reader.readAsDataURL(file);
  };

 
  const handleAddSkill = () => {
    if (!userData || !newSkill.trim()) return;
    const updatedSkills = [...(userData.skills || []), newSkill.trim()];
    setUserData({ ...userData, skills: updatedSkills });
    setNewSkill('');
    setShowAddSkillModal(false);
    setSuccess('Skill added successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  
  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = userData?.skills?.filter(s => s !== skill) || [];
    setUserData({ ...userData!, skills: updatedSkills });
    setSuccess('Skill removed!');
    setTimeout(() => setSuccess(null), 3000);
  };

  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setSuccess('Profile link copied to clipboard!');
    setTimeout(() => setSuccess(null), 3000);
    setShowShareModal(false);
  };

  
  const [appliedJobsList, setAppliedJobsList] = useState<Job[]>([]);
  useEffect(() => {
    if (!userData || !user) return;
    const fetchAppliedJobs = async () => {
      try {
        // ✅ جلب الطلبات الحقيقية التي قدم عليها المستخدم
        const applicationsQuery = query(
          collection(db, 'applications'),
          where('userId', '==', user.uid)
        );
        const applicationsSnapshot = await getDocs(applicationsQuery);
        
        if (applicationsSnapshot.empty) {
          setAppliedJobsList([]);
          return;
        }

        // ✅ جلب معلومات الوظائف من collection jobs
        const jobIds = applicationsSnapshot.docs.map(doc => doc.data().jobId).filter(Boolean);
        const jobsData: Job[] = [];

        for (const jobId of jobIds) {
          try {
            const jobDoc = await getDoc(doc(db, 'jobs', jobId));
            if (jobDoc.exists()) {
              const jobData = jobDoc.data();
              const application = applicationsSnapshot.docs.find(
                app => app.data().jobId === jobId
              );
              
              const appliedAt = application?.data().appliedAt;
              
              jobsData.push({
                id: jobDoc.id,
                title: jobData.title || 'Unknown Job',
                company: jobData.company || jobData.posterName || 'Unknown Company',
                location: jobData.location || 'Not specified',
                salary: jobData.salary || 'Not specified',
                tech: jobData.tech || '',
                type: jobData.type || 'full-time',
                remote: jobData.remote || 'No',
                timestamp: appliedAt || new Date(),
              });
            }
          } catch (error) {
            console.error(`Error fetching job ${jobId}:`, error);
          }
        }

        jobsData.sort((a, b) => {
          const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
          const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
          return dateB.getTime() - dateA.getTime();
        });

        setAppliedJobsList(jobsData);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setAppliedJobsList([]);
      }
    };
    fetchAppliedJobs();
  }, [userData, user]);

  if (loading) return <LoadingSpinner />;
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.center}>
          <h2>Please log in to view profile</h2>
          <p>You need to be logged in to access your profile page.</p>
          <Link to="/signin" style={{ 
            display: 'inline-block', 
            marginTop: '20px', 
            padding: '12px 24px', 
            background: '#3a25ff', 
            color: 'white', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }
  if (!userData) {
    return <LoadingSpinner />;
  }

  return (
    <div style={styles.container}>
         

  <nav className="navbar-container2">
         <div className="navbar-logo2">
  <img src="src/assets/img/logo2.png" className="logo2" alt="Logo" />
</div>

<ul className="navbar-links2">
  <li>
    <NavLink
      to="/courses"
      className={({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`}
    >
      <BookOpen size={20} className="nav-icon2" /> Course
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/jobs"
      className={({ isActive }) => `nav-link-item2 ${isActive ? 'active' : ''}`}
    >
      <Briefcase size={20} className="nav-icon2" /> Jobs
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/ai"
      className={({ isActive }) =>
        `nav-link-item2 chatbot-link2 ${isActive ? 'active' : ''}`
      }
    >
      <MessageSquare size={20} className="nav-icon2" /> Chatbot AI
    </NavLink>
  </li>
</ul>


        <div className="profile-container">
            <button
              className="profile-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userData?.photoURL ? (
                <img src={userData.photoURL} alt="Profile" className="profile-img" />
              ) : (
                <FaUser size={24} color="#fff" />
              )}
            </button>

          
          </div>
  <div className="divider2"></div>


          <div className="navbar-actions">
            <button className="login-button">Log In</button>
            <button className="signup-button">Sign Up</button>
          </div>


        </nav>        

      {success && (
        <div style={{ ...styles.alert, background: '#10b981' }}>
          <CheckCircle size={16} /> {success}
        </div>
      )}
      {error && (
        <div style={{ ...styles.alert, background: '#ef4444' }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.profileHeader}>
            <div style={styles.profileImageWrapper}>
              <img
                src={userData.photoURL || 'https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg'}
                alt="Profile"
                style={styles.profileImage}
              />
              <button onClick={() => setShowUploadModal(true)} style={styles.cameraBtn} title='btn'>
                <Camera size={16} />
              </button>
            </div>
            <div style={styles.profileInfo}>
              <div style={styles.nameSection}>
                <h1 style={styles.name}>{userData?.displayName || 'User'}</h1>
                <p style={styles.title}>{userData?.company || ''}</p>
                <div style={styles.stats}>
                  {/* <span><MapPin size={14} /> {userData.location}</span> */}
                  <span><Users size={14} /> {userData.connections || 0} connections</span>
                  <span><Eye size={14} /> {appliedJobsList.length || userData.appliedJobs || 0} applications</span>
                </div>
                <ProfileStrengthIndicator strength={appliedJobsList.length > 0 ? Math.min(100, appliedJobsList.length * 10) : (userData?.appliedJobs ? Math.min(100, userData.appliedJobs * 5) : 0)} />
              </div>
            </div>
            <div style={styles.actions}>
              <div style={styles.primaryActions}>
                {isEditing ? (
                  <>
                    <button onClick={handleSave} style={styles.saveBtn}>
                      <Save size={16} /> Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                      <X size={16} /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                      <Edit3 size={16} /> Edit Profile
                    </button>
                    <button onClick={() => setShowShareModal(true)} style={styles.shareBtn}>
                      <Share2 size={16} /> Share
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div style={styles.main}>
        {/* Stats */}
        <div style={styles.statsGrid}>
          <StatCard
            icon={<Briefcase size={32} color="white" />}
            title="Applications"
            value={appliedJobsList.length}
            change={appliedJobsList.length > 0 ? "100" : "0"}
            color=" #3b82f6"
          />
          <StatCard
            icon={<GraduationCap size={32} color="white" />}
            title="Courses Enrolled"
            value={userData.coursesEnrolled || enrolledCourses.length || 0}
            change={enrolledCourses.length > 0 ? "100" : "0"}
            color="#10b981"
          />
          <StatCard
            icon={<CheckCircle size={32} color="white" />}
            title="CV Uploads"
            value={(userData as any)?.cvUploads || appliedJobsList.length || 0}
            change={(userData as any)?.cvUploads || appliedJobsList.length ? "100" : "0"}
            color=" #8b5cf6"
          />
        </div>

        <div style={styles.tabsContainer}>
  <div style={styles.tabs}>
    {[
      { key: 'overview', label: 'Overview', icon: <User size={16} /> },
      { key: 'courses', label: 'My Courses', icon: <BookOpen size={16} /> },
      { key: 'jobs', label: 'Jobs', icon: <Briefcase size={16} /> },
      { key: 'skills', label: 'Skills', icon: <Award size={16} /> },
    ].map(tab => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        style={{
          ...styles.tab,
          ...(activeTab === tab.key ? styles.activeTab : styles.inactiveTab),
        }}
      >
        {tab.icon} {tab.label}
      </button>
    ))}
  </div>
</div>
        
        <div style={styles.tabContent}>
          {activeTab === 'overview' && (
            <div style={styles.overviewGrid}>
              <div style={styles.overviewLeft}>
                <div style={styles.contactSection}>
                  <h2 style={styles.sectionTitle}>Contact Information</h2>
                  <div style={styles.contactGrid}>
                    <div style={styles.contactItem}>
                      <Mail size={20} style={{ color: '#3b82f6' }} />
                      <div>
                        <span style={styles.contactLabel}>Email</span>
                        <span style={styles.contactValue}>{userData.email}</span>
                      </div>
                    </div>
                    <div style={styles.contactItem}>
                      <Phone size={20} style={{ color: '#10b981' }} />
                      <div>
                        <span style={styles.contactLabel}>Phone</span>
                        <span style={styles.contactValue}>{userData.phone || 'Not available'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={styles.bioSection}>
                  <h3 style={styles.sectionTitle}>About Me</h3>
                  {isEditing ? (
                    <textarea
                      value={editData.bio || ''}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      style={styles.textarea}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p style={styles.bioText}>{userData.bio || 'No bio added yet.'}</p>
                  )}
                </div>
              </div>
              <div style={styles.overviewRight}>
                <div style={styles.quickStats}>
                  <div style={styles.quickStatsGrid}>
                    <div style={styles.quickStat}>
                      <h3 style={styles.sectionTitle}>Quick Stats</h3>
                      <BarChart3 size={24} color="#3b82f6" />
                      <div>
                        <p style={styles.quickStatValue}>{appliedJobsList.length}</p>
                        <p style={styles.quickStatLabel}>Applications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>My Enrolled Courses</h2>
                <p style={styles.sectionSubtitle}>Continue your learning journey</p>
              </div>
              {enrolledCourses.length > 0 ? (
                <div style={styles.coursesGrid}>
                  {enrolledCourses.map((course: any, i: number) => (
                    <div key={i} style={styles.courseCard}>
                      <div style={styles.courseImageWrapper}>
                        <img
                          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center'}
                          alt={course.title}
                          style={styles.courseImage}
                        />
                        {course.certificate && (
                          <div style={styles.certificateBadge}>
                            <Award size={12} /> Certificate
                          </div>
                        )}
                      </div>
                      <div style={styles.courseContent}>
                        <h3 style={styles.courseTitle}>{course.title}</h3>
                        <div style={styles.courseMeta}>
                          <div style={styles.courseMetaItem}>
                            <Clock size={12} />
                            <span>{course.duration || 'N/A'}</span>
                          </div>
                          <div style={styles.courseMetaItem}>
                            <User size={12} />
                            <span style={{ fontSize: '12px' }}>{course.instructor || 'Unknown'}</span>
                          </div>
                          <div style={styles.courseMetaItem}>
                            <span style={{
                              ...styles.levelBadge,
                              background: course.level === 'Beginner' ? '#28a745' :
                                         course.level === 'Intermediate' ? '#ffc107' :
                                         course.level === 'Advanced' ? '#dc3545' : '#6c757d',
                              fontSize: '10px',
                              padding: '3px 8px'
                            }}>
                              {course.level || 'Beginner'}
                            </span>
                          </div>
                        </div>
                        <div style={styles.courseFooter}>
                          <span style={styles.coursePrice}>{course.price || 'Free'}</span>
                          <Link
                            to={`/courses`}
                            style={styles.viewCourseBtn}
                          >
                            View
                          </Link>
                        </div>
                        {course.progress !== undefined && course.progress > 0 && (
                          <div style={styles.progressBar}>
                            <div style={styles.progressLabel}>
                              <span style={{ fontSize: '11px' }}>Progress: {course.progress || 0}%</span>
                            </div>
                            <div style={styles.progressBarBg}>
                              <div
                                style={{
                                  ...styles.progressBarFill,
                                  width: `${course.progress || 0}%`
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <BookOpen size={48} color="#d1d5db" />
                  <h3 style={styles.emptyTitle}>No enrolled courses yet</h3>
                  <p style={styles.emptyDescription}>
                    Start learning by enrolling in courses from the Courses page
                  </p>
                  <Link to="/courses" style={styles.browseCoursesBtn}>
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Job Applications</h2>
                <p style={styles.sectionSubtitle}>Track your career opportunities</p>
              </div>
              {appliedJobsList.length > 0 ? (
                <div style={styles.jobsGrid}>
                  {appliedJobsList.map((job, i) => (
                    <div key={i} style={styles.jobCard}>
                      <div style={styles.jobHeader}>
                        <div style={styles.jobInfo}>
                          <h3 style={styles.jobTitle}>{job.title}</h3>
                          <p style={styles.jobCompany}>{job.company}</p>
                          <p style={styles.jobLocation}>
                            <MapPin size={14} /> {job.location}
                          </p>
                        </div>
                        <div style={styles.jobMeta}>
                          <span style={styles.jobSalary}>{job.salary}</span>
                          <span style={styles.jobType}>{job.type}</span>
                        </div>
                      </div>
                      <div style={styles.jobFooter}>
                        <span style={styles.jobStatus}>Applied</span>
                        <span style={styles.jobDate}>Applied {formatDate(job.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <Briefcase size={48} color="#d1d5db" />
                  <h3 style={styles.emptyTitle}>No jobs found</h3>
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Skills & Expertise</h2>
                <p style={styles.sectionSubtitle}>Showcase your technical abilities</p>
                <button
                  onClick={() => setShowAddSkillModal(true)}
                  style={styles.addBtn}
                >
                  <Plus size={16} /> Add Skill
                </button>
              </div>
              <div style={styles.skillsGrid}>
                <div style={styles.skillsContainer}>
                  {userData.skills?.map((skill, i) => (
                    <SkillTag
                      key={i}
                      skill={skill}
                      level={['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)]}
                      onRemove={() => handleRemoveSkill(skill)}
                      isEditing={isEditing}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Update Profile Picture"
      >
        <div style={styles.uploadArea}>
          <div style={styles.uploadIcon}>
            <Upload size={48} color="#3b82f6" />
          </div>
          <p style={styles.uploadText}>Choose a new profile picture</p>
          <input
          title='inpt'
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            style={styles.fileInput}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Profile"
      >
        <div style={styles.shareContent}>
          <p style={styles.shareText}>Share your profile with others</p>
          <div style={styles.shareUrl}>
            <input
              type="text"
              value={window.location.href}
              readOnly
              style={styles.shareInput}
            />
            <button onClick={handleShare} style={styles.copyBtn}>
              <Copy size={16} /> Copy
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showAddSkillModal}
        onClose={() => setShowAddSkillModal(false)}
        title="Add New Skill"
      >
        <div style={styles.addSkillForm}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Skill Name</label>
            <input
              type="text"
              placeholder="e.g., React, Python"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              style={styles.formInput}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Proficiency Level</label>
            <select 
              value={skillLevel} 
              onChange={(e) => setSkillLevel(e.target.value)}
              style={styles.formSelect}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div style={styles.modalActions}>
            <button onClick={() => setShowAddSkillModal(false)} style={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={handleAddSkill} style={styles.saveBtn}>
              <Plus size={16} /> Add Skill
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfilePage;

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Inter', sans-serif",
    background: 'white',
    minHeight: '100vh',
    position: 'relative'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #fbfbfbff, #ffffffff)'
  },
  spinnerWrapper: {
    position: 'relative',
    width: 60,
    height: 60
  },
  spinner: {
    width: 60,
    height: 60,
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3a25ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    position: 'absolute'
  },
  spinnerInner: {
    width: 40,
    height: 40,
    border: '3px solid transparent',
    borderTop: '3px solid #3a25ff',
    borderRadius: '50%',
    animation: 'spin 1.5s linear infinite reverse',
    position: 'absolute',
    top: 10,
    left: 10
  },
  loadingText: {
    marginTop: 80,
    color: '#4b5563',
    fontWeight: 600,
    fontSize: 18
  },
  center: {
    textAlign: 'center',
    padding: 60,
    color: '#6b7280',
    fontSize: 18,
    fontWeight: 500
  },
  alert: {
    position: 'fixed',
    top: 20,
    right: 20,
    padding: '16px 24px',
    color: 'white',
    borderRadius: 12,
    zIndex: 1000,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.25)',
  },
  hero: {
    background: 'linear-gradient(135deg, #f3f4f9ff 0%, #ffffffff 30%, #ffffffff 70%, #ffffffff 100%)',
    color: 'black',
    top:'100px',
    padding: '80px 20px',
    borderRadius: '0 0 40px 40px',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
  maxWidth: 1400,
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
},
profileHeader: {
  display: 'flex',
  gap: 30,
  alignItems: 'center',
  flexWrap: 'wrap',
},
profileImageWrapper: {
  position: 'relative',
  flexShrink: 0,
},
profileImage: {
  width: 150,
  height: 150,
  borderRadius: "50%",
  objectFit: "cover",
  border: "5px solid #fff",
  boxShadow: "0 4px 16px rgba(0,0,0,0.15), 0 0 0 6px rgba(255,255,255,0.5)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
},
profileImageHover: {
  transform: "scale(1.03)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.25), 0 0 0 8px rgba(59,130,246,0.25)",
},
cameraBtn: {
  position: "absolute",
  bottom: 8,
  right: 8,
  background: "linear-gradient(135deg, #3a25ff, #3a25ff)",
  color: "white",
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid white",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
},
cameraBtnHover: {
  transform: "scale(1.1)",
  boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
},
profileInfo: {
  flex: 1,
  minWidth: 300,
  padding: "0.5rem",
},
nameSection: {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 6,
},
name: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: "2.7rem",
    fontWeight: 700,
    color: "#2d2e32",
    letterSpacing: "0.5px",
    lineHeight: 1.3,
    margin: 0,
  },
  subtitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: "1rem",
    fontWeight: 500,
    color: "#6b7280",
    marginTop: 4,
  },

status: {
  fontSize: 14,
  fontWeight: 500,
  color: "#22c55e", // green like "Premium User"
  marginTop: 2,
},
  statsRow: {
    display: "flex",
    gap: 20,
    marginTop: 12,
    fontSize: 14,
    color: "#374151",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.6)",
    padding: "6px 12px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    backdropFilter: "blur(6px)",
    transition: "transform 0.2s ease",
  },
  statItemHover: {
    transform: "translateY(-2px)",
  },
  title: {
    fontSize: 20,
    opacity: 0.95,
    margin: '8px 0',
    fontWeight: 600
  },
  stats: {
    display: 'flex',
    gap: 24,
    marginBottom: 20,
    fontSize: 14,
    flexWrap: 'wrap'
  },
  strengthContainer: {
    background: 'rgba(228, 228, 228, 0.15)',
    padding: 16,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  strengthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  strengthLabel: {
    fontSize: 14,
    opacity: 0.9
  },
  strengthValue: {
    fontSize: 18,
    fontWeight: 700
  },
  strengthBar: {
    height: 8,
    background: 'rgba(181, 176, 176, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
    boxShadow: "0 0px 2px rgba(0,0,0,0.08)",
  },
  strengthFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.5s ease'
  },
  strengthTip: {
    fontSize: 12,
    opacity: 0.8,
    margin: 0
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-end'
  },
  primaryActions: {
    display: 'flex',
    gap: 12
  },
  editBtn: {
  padding: '15px 24px',
  background: '#3a25ff',        // filled color
  color: 'white',               // text color
  border: '2px solid #f5f6f9ff', // border matches background
  borderRadius: 15,
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',

},
shareBtn: {
  padding: '12px 24px',
  background: 'white',
  color: '#3a25ff',
  border: '2px solid #3a25ff',
  borderRadius: 15,
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',

},
  saveBtn: {
    padding: '12px 24px',
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: 15,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(184, 185, 184, 0.3)'
  },
  cancelBtn: {
     padding: '15px 24px',
  background: 'white',
  color: '#0c0c0cff',
  border: '2px solid #010101ff',
  borderRadius: 15,
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '100px 20px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
    marginBottom: 60
  },
  statCard: {
    background: 'white',
    borderRadius: 20,
    padding: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9'
  },
  statContent: {
    flex: 1
  },
  statHeader: {
    marginBottom: 12
  },
  statTitle: {
    fontSize: 13,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: 0,
    fontWeight: 600
  },
  statValue: {
    fontSize: 32,
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 8px 0',
    lineHeight: 1
  },
  change: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13
  },
  changeText: {
    color: '#10b981',
    fontWeight: 600
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#3b82f6',
  },
    tabsContainer: {
      width: "100%",
      background: "#f6f6f6bf", 
      padding: 20,
      display: "flex",
      justifyContent: "center",
      borderRadius:15,
    },
    tabs: {
      display: "flex",
      gap: 12,
      backgroundColor: "#ffffff8f",
      padding: 6,
      borderRadius: 16,
      position: "relative",
      width: "fit-content",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    tab: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 12,
      fontWeight: 500,
      fontSize: 14,
      border: "none",
      cursor: "pointer",
      background: "transparent",
      color: "black",
      position: "relative",
      zIndex: 1,
      transition: "color 0.2s ease",
    },
    activeTab: {
      color: "#3a25ff",
    },
    underline: {
      position: "absolute",
      height: 4,
      borderRadius: 2,
      backgroundColor: "#4f46e5",
      bottom: 0,
      transition: "all 0.3s ease",
    },
    tabContent: {
      marginTop: 20,
    },
    overviewGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
    },
  overviewLeft: {
    flex: 1
  },
  contactSection: {
    margin: '9px 0 0 0',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 22,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    cursor: 'default',
  },
  contactItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  },
  contactLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: 500,
    minWidth: 80,
  },
  contactValue: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: 600,
  },
  bioSection: {
    marginBottom: 32,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  textarea: {
    width: '100%',
    padding: 16,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    resize: 'vertical',
    minHeight: 100,
    transition: 'border-color 0.2s ease',
  },
  textareaFocus: {
    borderColor: '#4f46e5',
    outline: 'none',
  },
  bioText: {
    fontSize: 16,
    lineHeight: 1.6,
    color: '#1e293b',
  },
  overviewRight: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  quickStats: {
    marginBottom: 42,
  },
  quickStatsGrid: {
    display: "inline",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
  },
  quickStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
    cursor: "default",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 700,
    color: "#000000",
    borderRadius: 12,
    padding: "4px 12px",
    marginBottom: 12,
    textAlign: "left",
  },
  quickStatIcon: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbeafe",
    borderRadius: "50%",
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  quickStatLabel: {
    fontSize: 14,
    color: "#64748b",
    margin: 0,
  },

  recentActivity: {
    marginBottom: 32
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f1f5f9'
  },
  activityText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0f172a'
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b'
  },
  sectionHeader: {
    marginBottom: 32
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    margin: '11px 0 0 0',
  },
  addBtn: {
    padding: '15px 24px',
    background: '#3a25ff',
        margin: '11px 0 0 0',

    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20
  },
  jobCard: {
    background: 'white',
    borderRadius: 12,
    padding: 20,
    border: '1px solid #f1f5f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  jobInfo: {
    flex: 1
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: '#0f172a'
  },
  jobCompany: {
    fontSize: 14,
    color: '#64748b',
    margin: '4px 0 0 0'
  },
  jobLocation: {
    fontSize: 12,
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  jobMeta: {
    display: 'flex',
    gap: 12,
    fontSize: 12,
    color: '#64748b'
  },
  jobSalary: {
    background: '#dbeafe',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600
  },
  jobType: {
    background: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600
  },
  jobFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    color: '#64748b'
  },
  jobStatus: {
    background: '#dcfce7',
    color: '#166534',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600
  },
  jobDate: {
    fontWeight: 500
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    textAlign: 'center',
    color: '#6b7280'
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 600,
    margin: '0 0 12px 0'
  },
  emptyDescription: {
    fontSize: 14
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 32
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12
  },
  skillTagWrapper: {
    display: 'inline-block'
  },
  skillTag: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: 20,
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    transition: 'transform 0.2s ease'
  },
  skillLevel: {
    fontSize: 10,
    fontWeight: 400,
    background: 'rgba(255,255,255,0.2)',
    padding: '2px 6px',
    borderRadius: 4,
    marginLeft: 8
  },
  removeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: 4,
    transition: 'transform 0.2s ease'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'white',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: 24
  },
  modalBody: {
    padding: 20
  },
  uploadArea: {
    textAlign: 'center',
    padding: 40
  },
  uploadIcon: {
    marginBottom: 20
  },
  uploadText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20
  },
  fileInput: {
    display: 'block',
    margin: '0 auto',
    padding: 12,
    background: '#f1f5f9',
    border: '2px dashed #3b82f6',
    borderRadius: 12,
    cursor: 'pointer',
    width: '100%'
  },
  shareContent: {
    textAlign: 'center'
  },
  shareText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20
  },
  shareUrl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20
  },
  shareInput: {
    flex: 1,
    padding: 12,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 14
  },
  copyBtn: {
    padding: '12px 24px',
    background: '#3a25ff',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  socialShare: {
    textAlign: 'center'
  },
  socialButtons: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    marginTop: 16
  },
  socialBtn: {
    padding: '8px 16px',
    background: '#f1f5f9',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  addSkillForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#64748b'
  },
  formInput: {
    padding: 12,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 14
  },
  formSelect: {
    padding: 12,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 14
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16
  },
  courseCard: {
    background: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #f1f5f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  courseImageWrapper: {
    position: 'relative',
    width: '100%',
    height: 120,
    overflow: 'hidden'
  },
  courseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  certificateBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(40, 167, 69, 0.9)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 3
  },
  courseContent: {
    padding: 12
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0f172a',
    margin: '0 0 8px 0',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  courseDescription: {
    display: 'none'
  },
  courseMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  courseMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    color: '#64748b'
  },
  levelBadge: {
    padding: '3px 8px',
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 600,
    color: 'white'
  },
  courseFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1px solid #f1f5f9'
  },
  coursePrice: {
    fontSize: 14,
    fontWeight: 700,
    color: '#28a745'
  },
  viewCourseBtn: {
    padding: '6px 12px',
    background: '#3a25ff',
    color: 'white',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.2s ease'
  },
  progressBar: {
    marginTop: 10
  },
  progressLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: 600
  },
  progressBarBg: {
    height: 6,
    background: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3a25ff, #5a4bff)',
    borderRadius: 3,
    transition: 'width 0.3s ease'
  },
  browseCoursesBtn: {
    display: 'inline-block',
    marginTop: 16,
    padding: '12px 24px',
    background: '#3a25ff',
    color: 'white',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.2s ease'
  }
};