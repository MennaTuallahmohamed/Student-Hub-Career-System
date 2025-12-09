import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Briefcase, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import "./jobs.css";
import Apply from './Apply';
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


import {
  FaSearch,
  FaMapMarkerAlt,
  FaPen,
  FaMoneyBillWave,
  FaLaptopCode,
} from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { UserService } from '../firebase/src/firebaseServices';
import { collection, addDoc, onSnapshot, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";

interface Hiring {
  company: string;
  title: string;
  location: string;
  remote: string;
  salary: string;
  tech: string;
  type: string;
}

interface Filters {
  title: string;
  location: string;
  remote: string;
  salary: string;
  tech: string;
  type: string;
}
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
}
function Jobs() {
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [applicantsCounts, setApplicantsCounts] = useState<Record<string, number>>({});
  const [hireData, setHireData] = useState<Hiring>({
    company: "",
    title: "",
    location: "",
    remote: "",
    salary: "",
    tech: "",
    type: "",
  });

  const [filters, setFilters] = useState<Filters>({
    title: "",
    location: "",
    remote: "",
    salary: "",
    tech: "",
    type: "",
  });

  
  useEffect(() => {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobsData(jobsList);
    });

    return () => unsubscribe();
  }, []);

  // live applicants count per job
  useEffect(() => {
    const appsRef = collection(db, 'applications');
    const unsubscribe = onSnapshot(appsRef, (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.docs.forEach((d) => {
        const data: any = d.data();
        const jobId = data.jobId;
        if (jobId) {
          counts[jobId] = (counts[jobId] || 0) + 1;
        }
      });
      setApplicantsCounts(counts);
    });
    return () => unsubscribe();
  }, []);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleHireChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setHireData({ ...hireData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("Search Filters:", filters);
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'jobs'), {
        ...hireData,
        posterId: user?.uid || null,
        posterName: userData?.displayName || user?.email?.split('@')[0] || 'user',
        timestamp: new Date(),
      });
      alert('done! Job posted successfully.');
      setHireData({
        company: "",
        title: "",
        location: "",
        remote: "",
        salary: "",
        tech: "",
        type: "",
      });
    } catch (error) {
      console.error("Error posting job: ", error);
      alert(" fail to post job. Please try again." );
    }
  };


  const searchTerms = [
    'designer', 'Writer', 'Team leader', 'Fullstack', 'web developer',
    'Senior', 'Financial Analyst', 'Software', 'Web', 'Techno'
  ];

  return (
    <div className="jobsearch">
      <div className="Jobs">
       
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
                    CV Uploads: <span>{(userData as any)?.cvUploads || userData?.appliedJobs || 0}</span>
                  </li>
                        </ul>
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

        {/* Hero Section */}
        <img src="https://i.pinimg.com/1200x/42/ac/3d/42ac3da633954a5dd14666ce3f3acc21.jpg" alt="" className="backgroundimg" />
        <div className="hero-content1">
          <h1 className="titleJob1">
            Ready for Your Next Job? <br />
            Let’s Get <span className="highlight3">You Hired!</span>
          </h1>
          {/* <p className="JobParagraph">
            Find roles that match your skills and
            Start your journey for a better career.
          </p> */}
          <div className="button-group1">
            <div className="search2">
              Choose the one that best fits the tone and space you have!
              Take on new opportunities, grow, and make a meaningful impact in any organization you join
            </div>
            <div className="popular-searches-container">
              <h2 className="popular-searches-title">Popular Titles:</h2>
              <div className="tags-container">
                {searchTerms.map((term, index) => (
                  <button key={index} className="tag">{term}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
       
        <div className="filter-container">
          <h1 className="filter-title">Find Your Dream Job</h1>
          <p className="filter-paragraph">
            Browse <span>exciting job openings</span>, explore <span>new career paths</span>,
            and apply <span>instantly</span> with just a few clicks.
          </p>

          <div className="Filter-bar">
            <div className="filter-input">
              <FaPen className="filter-icon" />
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={filters.title}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input">
              <FaMapMarkerAlt className="filter-icon" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input">
              <FaBriefcase className="filter-icon" />
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="">Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="filter-input">
              <FaLaptopCode className="filter-icon" />
              <input
                type="text"
                name="tech"
                placeholder="Tech Stack"
                value={filters.tech}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input">
              <FaMoneyBillWave className="filter-icon" />
              <input
                type="text"
                name="salary"
                placeholder="Salary Range"
                value={filters.salary}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-input">
              <select name="remote" value={filters.remote} onChange={handleFilterChange}>
                <option value="">Remote or On-site</option>
                <option value="remote">Remote</option>
                <option value="on-site">On-site</option>
              </select>
            </div>
            <button className="filter-button" onClick={handleSearch}>
              <FaSearch /> Search
            </button>
          </div>

          <div className="filter-card">
            {jobsData.map((job, index) => (
              <div
                key={job.id}
                className={`job-card ${index === 0 ? "blue" : index === 1 ? "pink" : "yellow"}`}
              >
                <div className="job-header">
                  <span className="job-type">{job.type}</span>
                  <span className="job-time">{job.remote}</span>
                </div>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-salary">€ {job.salary} / Yearly</p>
                <div className="job-footer">
                  <p><FaMapMarkerAlt /> {job.location}</p>
                  <p><FaBriefcase /> {job.tech}</p>
                  <p><FaMoneyBillWave /> {job.salary}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Link to={`/apply/${job.id}`} className="apply-button">Apply Now</Link>
                  {user && job.posterId === user.uid && (
                    <Link
                      to={`/applicants?jobId=${job.id}`}
                      title="View applicants"
                      style={{
                        padding: '8px 12px',
                        background: '#0ea5e9',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                    >
                      <Users size={16} />
                      Applicants
                      <span style={{ background: '#fff', color: '#0ea5e9', borderRadius: '999px', padding: '2px 8px', fontWeight: 700 }}>
                        {applicantsCounts[job.id] || 0}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hirring">
          <img src="https://i.pinimg.com/originals/a4/8e/33/a48e33a09335b257fe221c0943e4e1ea.gif" className="hirreimage" alt="" />
          <h1 className="hire-head">Discover Your Perfect Team Member Quickly</h1>
          <p className="hire-paragraph">Find your perfect worker in the fastest time possible. Connect with skilled professionals quickly and efficiently to get the right fit for your team.</p>
        </div>

        <div className="body-form">
          <h1 className="form-title-hire">Hire the Best Talent</h1>
          <p className="form-para-hire">Post a job and get candidates quickly.</p>
          <h2 className="hire-title">Enter Job Details</h2>
          <form className="hire-bar" onSubmit={handlePostJob}>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={hireData.company}
              onChange={handleHireChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={hireData.title}
              onChange={handleHireChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={hireData.location}
              onChange={handleHireChange}
              required
            />
            <select
              name="type"
              value={hireData.type}
              onChange={handleHireChange}
              required
            >
              <option value="">Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <input
              type="text"
              name="tech"
              placeholder="Tech Stack (e.g. React, Node.js)"
              value={hireData.tech}
              onChange={handleHireChange}
              required
            />
            <input
              type="text"
              name="salary"
              placeholder="Salary Offered"
              value={hireData.salary}
              onChange={handleHireChange}
              required
            />
            <select
              name="remote"
              value={hireData.remote}
              onChange={handleHireChange}
              required
            >
              <option value="">Remote or On-site</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
            </select>
            <button type="submit" className="hire-button">Post Job</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Jobs;

