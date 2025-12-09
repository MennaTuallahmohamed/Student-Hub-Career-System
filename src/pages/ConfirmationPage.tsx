// 3ndi 7amas w katbtlk comment 3lshan tafhmi b3d kda fkdt al sha8f fa ma kameltsh

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  Globe, 
  DollarSign, 
  Cpu, 
  Home,
  Search,
  Clock,
  Mail,
  Phone,
  BarChart3,
  Users,
  FileCheck,
  TrendingUp,
  Calendar,
  Building2
} from 'lucide-react';
// تأكد من مسار الملف الصحيح
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import './ConfirmationPage.css';
import { db } from '../firebase/firebaseConfig';

interface LocationState {
  jobDetails?: {
    id: string;
    title: string;
    location: string;
    remote: string;
    type: string;
    salary: string;
    tech: string;
  };
  formData?: {
    fullName: string;
    email: string;
    phone: string;
  };
  applicationId?: string;
}

interface ApplicationStats {
  totalApplications: number;
  todayApplications: number;
  thisWeekApplications: number;
  thisMonthApplications: number;
  jobApplicationCount: number;
  userTotalApplications: number;
  companyApplications: number;
  averageResponseTime: string;
  todayChange?: string;
  weekChange?: string;
  monthChange?: string;
}

function ConfirmationPage() {
  const location = useLocation();
  const state = location.state as LocationState;
  const [stats, setStats] = useState<ApplicationStats>({
    totalApplications: 0,
    todayApplications: 0,
    thisWeekApplications: 0,
    thisMonthApplications: 0,
    jobApplicationCount: 0,
    userTotalApplications: 0,
    companyApplications: 0,
    averageResponseTime: '3-5 days',
    todayChange: '+0%',
    weekChange: '+0%',
    monthChange: '+0%'
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Generate a random application ID if not provided
  const applicationId = state?.applicationId || `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Fetch real statistics from Firebase
  useEffect(() => {
    const fetchApplicationStats = async () => {
      setIsLoadingStats(true);
      
      try {
        const applicationsRef = collection(db, 'applications');
        
        // Get total applications
        const totalSnapshot = await getDocs(applicationsRef);
        const totalApplications = totalSnapshot.size;
        
        // Get today's applications
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayQuery = query(
          applicationsRef,
          where('createdAt', '>=', Timestamp.fromDate(today))
        );
        const todaySnapshot = await getDocs(todayQuery);
        const todayApplications = todaySnapshot.size;
        
        // Get yesterday's applications for comparison
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayQuery = query(
          applicationsRef,
          where('createdAt', '>=', Timestamp.fromDate(yesterday)),
          where('createdAt', '<', Timestamp.fromDate(today))
        );
        const yesterdaySnapshot = await getDocs(yesterdayQuery);
        const yesterdayApplications = yesterdaySnapshot.size;
        
        // Get this week's applications
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekQuery = query(
          applicationsRef,
          where('createdAt', '>=', Timestamp.fromDate(weekStart))
        );
        const weekSnapshot = await getDocs(weekQuery);
        const thisWeekApplications = weekSnapshot.size;
        
        // Get last week's applications for comparison
        const lastWeekStart = new Date(weekStart);
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);
        const lastWeekEnd = new Date(weekStart);
        const lastWeekQuery = query(
          applicationsRef,
          where('createdAt', '>=', Timestamp.fromDate(lastWeekStart)),
          where('createdAt', '<', Timestamp.fromDate(lastWeekEnd))
        );
        const lastWeekSnapshot = await getDocs(lastWeekQuery);
        const lastWeekApplications = lastWeekSnapshot.size;
        
        // Get this month's applications
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);
        const monthQuery = query(
          applicationsRef,
          where('createdAt', '>=', Timestamp.fromDate(monthStart))
        );
        const monthSnapshot = await getDocs(monthQuery);
        const thisMonthApplications = monthSnapshot.size;
        
        // Get last month's applications for comparison
        const lastMonthStart = new Date(monthStart);
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
        const lastMonthEnd = new Date(monthStart);
        const lastMonthQuery = query(
          applicationsRef,
          where('createdAt', '>=', Timestamp.fromDate(lastMonthStart)),
          where('createdAt', '<', Timestamp.fromDate(lastMonthEnd))
        );
        const lastMonthSnapshot = await getDocs(lastMonthQuery);
        const lastMonthApplications = lastMonthSnapshot.size;
        
        // Get applications for this specific job
        const jobQuery = query(
          applicationsRef,
          where('jobId', '==', state?.jobDetails?.id)
        );
        const jobSnapshot = await getDocs(jobQuery);
        const jobApplicationCount = jobSnapshot.size;
        
        // Get user's total applications
        const userQuery = query(
          applicationsRef,
          where('applicantEmail', '==', state?.formData?.email)
        );
        const userSnapshot = await getDocs(userQuery);
        const userTotalApplications = userSnapshot.size;
        
        // Calculate percentage changes
        const todayChange = yesterdayApplications > 0 
          ? Math.round(((todayApplications - yesterdayApplications) / yesterdayApplications) * 100)
          : 0;
        
        const weekChange = lastWeekApplications > 0 
          ? Math.round(((thisWeekApplications - lastWeekApplications) / lastWeekApplications) * 100)
          : 0;
          
        const monthChange = lastMonthApplications > 0 
          ? Math.round(((thisMonthApplications - lastMonthApplications) / lastMonthApplications) * 100)
          : 0;
        
        setStats({
          totalApplications,
          todayApplications,
          thisWeekApplications,
          thisMonthApplications,
          jobApplicationCount,
          userTotalApplications,
          companyApplications: totalApplications, // أو يمكنك إضافة query محدد للشركة
          averageResponseTime: '3-5 days',
          todayChange: todayChange > 0 ? `+${todayChange}%` : `${todayChange}%`,
          weekChange: weekChange > 0 ? `+${weekChange}%` : `${weekChange}%`,
          monthChange: monthChange > 0 ? `+${monthChange}%` : `${monthChange}%`
        });
        
      } catch (error) {
        console.error('Error fetching application stats:', error);
        // Fallback to basic stats if error occurs
        setStats({
          totalApplications: 0,
          todayApplications: 0,
          thisWeekApplications: 0,
          thisMonthApplications: 0,
          jobApplicationCount: 0,
          userTotalApplications: 0,
          companyApplications: 0,
          averageResponseTime: 'N/A'
        });
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (state?.jobDetails && state?.formData) {
      fetchApplicationStats();
    } else {
      setIsLoadingStats(false);
    }
  }, [state?.jobDetails?.id, state?.formData?.email]);

  if (!state?.jobDetails || !state?.formData) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-container">
          <h2>No Application Data Found</h2>
          <p>It seems you reached this page directly. Please submit an application first.</p>
          <Link to="/jobs" className="btn btn-primary">
            <Search size={18} />
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  const { jobDetails, formData } = state;

  const StatCard = ({ icon: Icon, label, value, trend, color = '#3b82f6' }: {
    icon: any;
    label: string;
    value: string | number;
    trend?: string;
    color?: string;
  }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}20`, color }}>
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <div className="stat-value" style={{ color }}>
          {isLoadingStats ? (
            <div className="stat-skeleton"></div>
          ) : (
            typeof value === 'number' ? value.toLocaleString() : value
          )}
        </div>
        <div className="stat-label">{label}</div>
        {trend && !isLoadingStats && (
          <div className="stat-trend">
            <TrendingUp size={12} />
            {trend}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <CheckCircle size={80} className="success-icon" />
        
        <h1 className="confirmation-title">Application Submitted Successfully!</h1>
        
        <p className="confirmation-message">
          Thank you, <strong>{formData.fullName}</strong>! Your application for the 
          <strong> {jobDetails.title}</strong> position has been successfully submitted 
          and received by our team.
        </p>

        <div className="application-id">
          <span className="application-id-label">Application ID:</span>
          {applicationId}
        </div>

        {/* Enhanced Statistics Section */}
        <div className="stats-section">
          <h3 className="stats-title">
            <BarChart3 size={20} />
            Application Analytics
          </h3>
          
          <div className="stats-grid">
            <StatCard
              icon={Users}
              label="Total Applications Today"
              value={stats.todayApplications}
              trend={stats.todayChange || '+0%'}
              color="#10b981"
            />
            <StatCard
              icon={FileCheck}
              label="Applications This Week"
              value={stats.thisWeekApplications}
              trend={stats.weekChange || '+0%'}
              color="#3b82f6"
            />
            <StatCard
              icon={Calendar}
              label="Applications This Month"
              value={stats.thisMonthApplications}
              trend={stats.monthChange || '+0%'}
              color="#8b5cf6"
            />
            <StatCard
              icon={Building2}
              label="Applications for This Job"
              value={stats.jobApplicationCount}
              color="#f59e0b"
            />
          </div>

          <div className="stats-summary">
            <div className="summary-item">
              <span className="summary-label">Your Total Applications:</span>
              <span className="summary-value">
                {isLoadingStats ? (
                  <div className="inline-skeleton"></div>
                ) : (
                  stats.userTotalApplications
                )}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Platform Total Applications:</span>
              <span className="summary-value">
                {isLoadingStats ? (
                  <div className="inline-skeleton"></div>
                ) : (
                  stats.totalApplications.toLocaleString()
                )}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Average Response Time:</span>
              <span className="summary-value">
                {isLoadingStats ? (
                  <div className="inline-skeleton"></div>
                ) : (
                  stats.averageResponseTime
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="job-details-card">
          <h3 className="job-details-title">Position Applied For</h3>
          <h4 style={{ color: '#1f2937', fontSize: '1.3rem', marginBottom: '15px' }}>
            {jobDetails.title}
          </h4>
          
          <div className="job-meta-info">
            <div className="job-meta-item">
              <MapPin size={16} />
              <span>{jobDetails.location}</span>
            </div>
            <div className="job-meta-item">
              <Globe size={16} />
              <span>{jobDetails.remote}</span>
            </div>
            <div className="job-meta-item">
              <Briefcase size={16} />
              <span>{jobDetails.type}</span>
            </div>
            <div className="job-meta-item">
              <DollarSign size={16} />
              <span>{jobDetails.salary}/month</span>
            </div>
          </div>

          <div className="tech-stack">
            <span className="tech-stack-label">
              <Cpu size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Tech Stack:
            </span>
            <span>{jobDetails.tech}</span>
          </div>
        </div>

        <div className="job-details-card" style={{ background: '#f0f9ff', borderColor: '#0ea5e9' }}>
          <h3 className="job-details-title" style={{ color: '#0c4a6e' }}>
            <Mail size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Contact Information
          </h3>
          <div style={{ textAlign: 'left' }}>
            <p><strong>Email:</strong> {formData.email}</p>
            {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
          </div>
        </div>

        <div className="next-steps">
          <h3 className="next-steps-title">
            <Clock size={20} />
            What's Next?
          </h3>
          <ul className="next-steps-list">
            <li>✅ Your application has been added to our candidate pool</li>
            <li>📧 You'll receive a confirmation email within the next few minutes</li>
            <li>👀 Our HR team will review your application within 3-5 business days</li>
            <li>📞 If you're shortlisted, we'll contact you for the next steps</li>
            <li>💼 Keep an eye on your email for updates about your application status</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/jobs" className="btn btn-primary">
            <Search size={18} />
            Browse More Jobs
          </Link>
          <Link to="/" className="btn btn-secondary">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;