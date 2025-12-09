// ana 3adlt f code da bsar7ha w katbtlk comment fa rakzy feh 3lshan cont adef profile  page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Briefcase, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import './HomePage.css';
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


import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { UserService } from '../firebase/src/firebaseServices';

const cards = [
  {
    title: 'Why Choose StudyHub?',
    description:
      'Master new skills with AI-curated courses and a personalized learning experience tailored just for you.',
  },
  {
    title: 'Student Career Launchpad',
    description:
      'Connect with top internships and entry-level jobs with AI recommendations suited to your strengths.',
  },
  {
    title: 'All-in-One Dashboard',
    description:
      'Track your learning, job applications, and career growth — all in one unified interface.',
  },
  {
    title: 'Real-Time Progress Tracking',
    description:
      'Visualize your upskilling journey with live analytics and smart reminders.',
  },
  {
    title: 'Tailored Career Paths',
    description:
      'AI suggests career paths based on your learning patterns, goals, and market trends.',
  },
  {
    title: 'Built for Students, Powered by AI',
    description:
      'The perfect synergy of learning and employment, designed for modern learners.',
  },
];

function HomePage() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await UserService.getUserData(user.uid);
        setUserData(data);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="homepage">
     

  <nav className="navbar-container2">
         <div className="navbar-logo2">
   <NavLink
      to="/homepage"
    >
        <img src="src/assets/img/logo2.png" className="logo2" alt="Logo" />

    </NavLink>
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

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  {userData?.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" className="profile-pic" />
                  ) : (
                    <FaUser size={40} color="#ffffffff" />
                  )}
                  <h4>Welcome, {userData?.displayName || user?.email?.split('@')[0] || 'User'}!</h4>
                </div>
                <ul>
                  <li>
                    <FaBriefcase /> Applied Jobs: <span>{userData?.appliedJobs || 0}</span>
                  </li>
                  <li>
                    <FaBook /> Courses Taken: <span>{userData?.coursesEnrolled || 0}</span>
                  </li>
                  <li>
                    <FaPencilAlt /> Exercises Done: <span>{userData?.exercisesCompleted || 0}</span>
                  </li>
                  <li>
                    <FaFileDownload /> Notes Downloaded: <span>{userData?.downloads || 0}</span>
                  </li>
                  <li>Shared Notes: <span>{userData?.sharedNotes || 0}</span></li>
                  <li>
                    <FaFileDownload /> CV Uploads: <span>{(userData as any)?.cvUploads || userData?.appliedJobs || 0}</span>
                  </li>
                </ul>
                {userData?.registeredCourses && userData.registeredCourses.length > 0 && (
                  <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <FaBook /> My Courses ({userData.registeredCourses.length})
                    </h5>
                    <div style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {userData.registeredCourses.slice(0, 3).map((course: any, idx: number) => (
                        <div key={idx} style={{
                          background: 'rgba(255,255,255,0.1)',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}>
                          <div style={{
                            fontWeight: 600,
                            color: '#fff',
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {course.title || 'Untitled Course'}
                          </div>
                          <div style={{
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <Clock size={10} /> {course.duration || 'N/A'}
                            {course.progress !== undefined && (
                              <>
                                <span>•</span>
                                <span>{course.progress || 0}%</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                      {userData.registeredCourses.length > 3 && (
                        <div style={{
                          textAlign: 'center',
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.7)',
                          padding: '8px'
                        }}>
                          +{userData.registeredCourses.length - 3} more courses
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="profile-actions">
                  <Link to="/profile" className="profile-link">
                    View Profile
                  </Link>
                  <button className="logout-btn" onClick={() => auth.signOut()}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
  <div className="divider2"></div>


        <div className="navbar-actions">
    <button className="login-button">
        <Link to="./signIn">Log In</Link>
    </button>
    <button className="signup-button">
        <Link to="./Register">Sign Up</Link>
    </button>
</div>


        </nav>        

  
     
     
      <h1 className="head1">
        What’s Your Goal Today <br />
        <span className="highlight">Study Smarter</span> or Find Your<span className="highlight2"> Next Job?</span>
      </h1>
      <h3 className="head3">
        Choose what fits you best in a smart,
        <br /> simple and personal way.
      </h3>
<div className="stats-container">
  <div className="stat-item">
    <div className="stat-value">15,2K</div>
    <div className="stat-label">courses</div>
  </div>
  <div className="divider"></div>
  <div className="stat-item">
    <div className="stat-value">4,5K</div> 
    <div className="stat-label">jobs</div>
  </div>
  <div className="divider"></div>
  <div className="stat-item">
    <div className="stat-value">
     
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
    <div className="stat-label">chatbot</div>
  </div>
</div>
      
      <div className="photo-hover">
        <section className="people-hoverr">
          <div className="hoverr student">
            <div className="card-info">
    <h3> <Link to="/courses" className='styled-link'>Courses</Link></h3> 
            </div>
          </div>
          <div className="hoverr man">
            <div className="card-info">
              <h3>      <Link to="/jobs" className="styled-link">Job Search</Link></h3>
            </div>
          </div>
          <div className="hoverr ai">
            <div className="card-info">
              <h3>      <Link to="/ai" className="styled-link">AI Chatbot</Link> </h3>
            </div>
          </div>
        </section>
      </div>

      <h2 className="choose">Why Choose StudyHub & StudentCareer?</h2>

      {/* Loop Slider */}
      <div className="loop-slider-container">
        <div className="loop-track">
          {[...cards, ...cards].map((card, index) => (
            <div className="loop-card" key={index}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="background">
        <h1 className="learning-style">
          Finding work’s hard!
          <hr className="learn" />
        </h1>
        <p className="challenge">Every application is a step toward your future career.</p>
        <p>
           <Link to="/jobs" className="borderword">
              Take This Step Now!
          </Link>
         </p>

        <div className="card-container">
          <h2>85%</h2>
          <p>of Users Found a Job Faster</p>
          <div className="progress-bar">
            <div className="progress green"></div>
            <div className="progress yellow"></div>
            <div className="progress red"></div>
          </div>
        </div>

        <div className="cards-container">
          <div className="card3 yellow-card">
            <h2>30%</h2>
            <p>Faster Hiring Process</p>
            <div className="bar-visual">
              <div className="bar yellow1"></div>
              <div className="bar green1"></div>
              <div className="bar blue"></div>
            </div>
          </div>
          <div className="card3 purple-card">
            <h2>92%</h2>
            <p>Offer Acceptance Rate</p>
            <div className="semi-circle"></div>
          </div>
        </div>

        <h1 className="work">
          Learning takes time!
          <hr className="works" />
        </h1>
        <p className="appp">Every challenge in learning is a step toward success.</p>
        <button>
           <Link to="/courses" className="coursess">
                    Take This Step Now!      </Link>
          </button>
        <img src="src/assets/img/webdevelopment.png" alt="" className="webjob" />

        <h1 className="AITitle">Get Ready with Your AI Support</h1>
        <p className="AIparagraph">
          <span className="percant">82%</span> of students showed improved performance with personalized feedback.
        </p>
        <p className="AIparagraph2">
          AI Support: accurately grades essays, quizzes, tracks your learning, and answers personally to any question.
        </p>
        <img src="src/assets/img/robot.png" alt="" className="robot" />
      </div>

      {/* Footer */}
      <div className="footer-container">
        <div className="subscribe-section">
          <h2>Subscribe to Get Special Price</h2>
          <div className="subscribe-input">
            <input type="email" placeholder="Email address" />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <h3>StudyHub & StudentCareer</h3>
            <p>One of the best websites that offers courses and job search with AI assistant.</p>
            <div className="social-icons">
              <FaInstagram />
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
            </div>
            <p className="copyright">
              © 2025 <strong>StudyHub & StudentCareer</strong>. All Rights Reserved.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4>ON OUR SITE</h4>
              <p>About</p>
              <p>Features</p>
              <p>Support</p>
            </div>
            <div>
              <h4>Services</h4>
              <p>Career</p>
              <p>Courses</p>
              <p>AI</p>
            </div>
            <div>
              <h4>CONTACT</h4>
              <p>StudyHubStudentCareer@gmail.com</p>
              <p>+961 70 793 988</p>
              <p>Beirut, Lebanon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;