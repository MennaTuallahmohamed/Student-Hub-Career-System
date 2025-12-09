import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { ApplicationsService } from '../firebase/src/firebaseServices';
import { collection, query, where, onSnapshot, doc, getDoc, orderBy } from 'firebase/firestore';
import { 
  Download, Eye, EyeOff, FileText, Users, TrendingUp, Calendar, 
  Filter, Search, CheckCircle2, XCircle, Clock, Star, MapPin, 
  Briefcase, Mail, Phone, Award, MessageSquare, Save, Loader2,
  ArrowLeft, Globe, Sparkles
} from 'lucide-react';
import './Applicants.css';

type Job = {
  id: string;
  title: string;
  company?: string;
  posterId?: string;
  applicantsCount?: number;
  applicantsByStatus?: Record<string, number>;
  applicantsViewedCount?: number;
  topEmailDomains?: Array<{ domain: string; count: number }>;
  lastApplicationAt?: any;
};

export default function Applicants() {
  const [user] = useAuthState(auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [scoreDrafts, setScoreDrafts] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewedOnly, setViewedOnly] = useState<boolean>(false);
  const [domainFilter, setDomainFilter] = useState<string>('');
  const [minScore, setMinScore] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('appliedAt_desc');
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user?.uid) return;
    const qJobs = query(collection(db, 'jobs'), where('posterId', '==', user.uid));
    const unsub = onSnapshot(qJobs, async (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
      setJobs(list);
      const requested = searchParams.get('jobId');
      if (requested && list.some(j => j.id === requested)) {
        setSelectedJobId(requested);
      } else if (!selectedJobId && list.length) {
        setSelectedJobId(list[0].id);
      }
    });
    return () => unsub();
  }, [user?.uid, searchParams, selectedJobId]);

  useEffect(() => {
    if (selectedJobId) {
      setSearchParams({ jobId: selectedJobId });
    }
  }, [selectedJobId, setSearchParams]);

  const loadJobDetails = useCallback(async (jobId: string) => {
    const jobRef = doc(db, 'jobs', jobId);
    const jobSnap = await getDoc(jobRef);
    if (jobSnap.exists()) {
      setSelectedJob({ id: jobSnap.id, ...jobSnap.data() } as Job);
    } else {
      setSelectedJob(null);
    }
  }, []);

  useEffect(() => {
    if (!selectedJobId) {
      setApplicants([]);
      setSelectedJob(null);
      return;
    }
    
    setLoading(true);
    loadJobDetails(selectedJobId);

    // Real-time updates for applicants
    const qApps = query(
      collection(db, 'applications'),
      where('jobId', '==', selectedJobId),
      orderBy('appliedAt', 'desc')
    );
    
    const unsub = onSnapshot(
      qApps,
      (snap) => {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        setApplicants(list);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading applicants:', error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [selectedJobId, loadJobDetails]);

  const stats = useMemo(() => {
    const byStatus: Record<string, number> = {};
    let viewed = 0;
    applicants.forEach((a) => {
      const s = a.status || 'pending';
      byStatus[s] = (byStatus[s] || 0) + 1;
      if (a.viewed) viewed += 1;
    });
    return { total: applicants.length, byStatus, viewed };
  }, [applicants]);

  const filtered = useMemo(() => {
    let list = [...applicants];
    if (statusFilter !== 'all') {
      list = list.filter(a => (a.status || 'pending') === statusFilter);
    }
    if (viewedOnly) {
      list = list.filter(a => !!a.viewed);
    }
    if (domainFilter.trim()) {
      const d = domainFilter.trim().toLowerCase();
      list = list.filter(a => (a.emailDomain || '').toLowerCase().includes(d));
    }
    const min = Number(minScore);
    if (!Number.isNaN(min) && minScore !== '') {
      list = list.filter(a => typeof a.score === 'number' && a.score >= min);
    }
    switch (sortBy) {
      case 'score_desc':
        list.sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity));
        break;
      case 'score_asc':
        list.sort((a, b) => (a.score ?? Infinity) - (b.score ?? Infinity));
        break;
      case 'name_az':
        list.sort((a, b) => String(a.fullName || '').localeCompare(String(b.fullName || '')));
        break;
      case 'appliedAt_asc':
        list.sort((a, b) => {
          const at = a.appliedAt?.toDate ? a.appliedAt.toDate().getTime() : 0;
          const bt = b.appliedAt?.toDate ? b.appliedAt.toDate().getTime() : 0;
          return at - bt;
        });
        break;
      default:
        list.sort((a, b) => {
          const at = a.appliedAt?.toDate ? a.appliedAt.toDate().getTime() : 0;
          const bt = b.appliedAt?.toDate ? b.appliedAt.toDate().getTime() : 0;
          return bt - at;
        });
    }
    return list;
  }, [applicants, statusFilter, viewedOnly, domainFilter, minScore, sortBy]);

  const markViewed = async (id: string) => {
    if (!selectedJobId) return;
    setActionLoading(prev => ({ ...prev, [`view-${id}`]: true }));
    try {
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, viewed: true, viewedAt: new Date() } : a));
      await ApplicationsService.markViewed(id);
    } catch (error) {
      console.error('Error marking viewed:', error);
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, viewed: false } : a));
    } finally {
      setActionLoading(prev => ({ ...prev, [`view-${id}`]: false }));
    }
  };

  const updateStatus = async (id: string, next: any) => {
    if (!selectedJobId) return;
    setActionLoading(prev => ({ ...prev, [`status-${id}`]: true }));
    try {
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: next, stage: next } : a));
      await ApplicationsService.updateStatus(id, next);
    } catch (error) {
      console.error('Error updating status:', error);
      const list = await ApplicationsService.getByJob(selectedJobId);
      setApplicants(list);
    } finally {
      setActionLoading(prev => ({ ...prev, [`status-${id}`]: false }));
    }
  };

  const addNote = async (id: string) => {
    if (!selectedJobId) return;
    const note = (noteDrafts[id] || '').trim();
    if (!note) return;
    setActionLoading(prev => ({ ...prev, [`note-${id}`]: true }));
    try {
      await ApplicationsService.addNote(id, note);
      setNoteDrafts(prev => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note. Please try again.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`note-${id}`]: false }));
    }
  };

  const saveScore = async (id: string) => {
    if (!selectedJobId) return;
    const raw = scoreDrafts[id];
    if (raw === undefined) return;
    const v = Number(raw);
    if (Number.isNaN(v) || v < 0 || v > 100) {
      alert('Score must be between 0 and 100');
      return;
    }
    setActionLoading(prev => ({ ...prev, [`score-${id}`]: true }));
    try {
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, score: v } : a));
      await ApplicationsService.scoreApplicant(id, v);
      setScoreDrafts(prev => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error('Error saving score:', error);
      const list = await ApplicationsService.getByJob(selectedJobId);
      setApplicants(list);
    } finally {
      setActionLoading(prev => ({ ...prev, [`score-${id}`]: false }));
    }
  };

  const markAllViewed = async () => {
    if (!selectedJobId || filtered.length === 0) return;
    setIsBulkUpdating(true);
    try {
      const toUpdate = filtered.filter(a => !a.viewed);
      setApplicants(prev => prev.map(a => 
        toUpdate.some(t => t.id === a.id) ? { ...a, viewed: true, viewedAt: new Date() } : a
      ));
      await Promise.all(toUpdate.map(a => ApplicationsService.markViewed(a.id)));
    } catch (error) {
      console.error('Error marking all viewed:', error);
      alert('Some updates failed. Please refresh.');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const setStatusForAll = async (next: any) => {
    if (!selectedJobId || filtered.length === 0) return;
    setIsBulkUpdating(true);
    try {
      setApplicants(prev => prev.map(a => 
        filtered.some(f => f.id === a.id) ? { ...a, status: next, stage: next } : a
      ));
      await Promise.all(filtered.map(a => ApplicationsService.updateStatus(a.id, next)));
    } catch (error) {
      console.error('Error updating status for all:', error);
      alert('Some updates failed. Please refresh.');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const exportCSV = () => {
    const rows = [
      ['Full Name', 'Email', 'Phone', 'Status', 'Viewed', 'Score', 'Applied At', 'Email Domain'].join(',')
    ];
    filtered.forEach(a => {
      const applied = a.appliedAt?.toDate ? a.appliedAt.toDate().toISOString() : '';
      rows.push([
        `"${(a.fullName || '').replace(/"/g, '""')}"`,
        `"${(a.email || '').replace(/"/g, '""')}"`,
        `"${(a.phone || '').replace(/"/g, '""')}"`,
        a.status || 'pending',
        a.viewed ? 'yes' : 'no',
        a.score ?? '',
        applied,
        a.emailDomain || ''
      ].join(','));
    });
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedJob?.title || 'applicants'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="apps-auth-prompt">
        <h2>Please sign in</h2>
        <Link to="/signin" className="apps-btn primary">Go to Sign In</Link>
      </div>
    );
  }

  const statusSummary = useMemo(() => {
    const entries = Object.entries(stats.byStatus);
    return entries.map(([status, count]) => ({
      status,
      count,
      percentage: stats.total ? Math.round((count / stats.total) * 100) : 0,
    }));
  }, [stats]);

  const topDomains = useMemo(() => {
    const tally: Record<string, number> = {};
    applicants.forEach((a) => {
      if (a.emailDomain) {
        tally[a.emailDomain] = (tally[a.emailDomain] || 0) + 1;
      }
    });
    return Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [applicants]);

  const statusOptions = ['pending', 'reviewing', 'interview', 'offered', 'rejected', 'hired'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'reviewing': return <Eye size={14} />;
      case 'interview': return <Briefcase size={14} />;
      case 'offered': return <Award size={14} />;
      case 'rejected': return <XCircle size={14} />;
      case 'hired': return <CheckCircle2 size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="apps-wrapper">
      <div className="apps-shell">
      <div className="apps-header">
        <Link to="/jobs" className="apps-backlink">
          <ArrowLeft size={18} />
          Back to Jobs
        </Link>
        <div className="apps-header-title">
          <h1 className="apps-title">
            <Users size={32} />
            Applicants Dashboard
          </h1>
          <p className="apps-subtitle">Manage and review job applications</p>
        </div>
      </div>

      <div className="apps-summary">
        <div className="summary-card">
          <div className="summary-icon-wrapper" style={{ background: ' #667eea' }}>
            <Users size={24} color='white'/>
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Applicants</span>
            <span className="summary-value">{stats.total}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon-wrapper" style={{ background: ' #f093fb ' }}>
            <Eye size={24} color='white' />
          </div>
          <div className="summary-content">
            <span className="summary-label">Viewed</span>
            <span className="summary-value">{stats.viewed}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon-wrapper" style={{ background: ' #4facfe ' }}>
            <Globe size={24} color='white'/>
          </div>
          <div className="summary-content">
            <span className="summary-label">Unique Domains</span>
            <span className="summary-value">{topDomains.length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon-wrapper" style={{ background: '#fa709a ' }}>
            <Calendar size={24} color='white'/>
          </div>
          <div className="summary-content">
            <span className="summary-label">Last Application</span>
            <span className="summary-value-small">
              {selectedJob?.lastApplicationAt?.toDate 
                ? selectedJob.lastApplicationAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="apps-layout">
        <div className="apps-sidebar card">
          <h3 className="card-title">
            <Briefcase size={18} />
            My Jobs
          </h3>
          <div className="list-gap">
            {jobs.map((j) => (
              <button
                key={j.id}
                onClick={() => setSelectedJobId(j.id)}
                className={`joblist-item ${selectedJobId === j.id ? 'active' : ''}`}
              >
                <div className="joblist-title">{j.title}</div>
                <div className="joblist-meta">
                  <Users size={12} />
                  {j.applicantsCount ?? 0} applicants
                </div>
              </button>
            ))}
            {jobs.length === 0 && (
              <div className="apps-empty-state">
                <Briefcase size={48} />
                <p>No jobs posted yet</p>
              </div>
            )}
          </div>

          {statusSummary.length > 0 && (
            <div className="apps-status-breakdown">
              <h4>
                <TrendingUp size={14} />
                Status Breakdown
              </h4>
              <ul>
                {statusSummary.map(({ status, count, percentage }) => (
                  <li key={status}>
                    <span className="status-label">
                      {getStatusIcon(status)}
                      {status}
                    </span>
                    <span className="status-value">{count} ({percentage}%)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topDomains.length > 0 && (
            <div className="apps-status-breakdown">
              <h4>
                <Globe size={14} />
                Top Email Domains
              </h4>
              <ul>
                {topDomains.map(([domain, count]) => (
                  <li key={domain}>
                    <span>{domain}</span>
                    <span className="domain-count">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="apps-content card">
          <div className="apps-content-header">
            <div>
              <h3 className="card-title">
                {selectedJob?.title || 'Select a job'}
                {selectedJob?.company && <span className="job-company"> • {selectedJob.company}</span>}
              </h3>
              <div className="apps-stats">
                <span><Users size={14} /> {stats.total}</span>
                <span><Eye size={14} /> {stats.viewed}</span>
                {Object.entries(stats.byStatus).map(([k, v]) => (
                  <span key={k} className="status-stat">
                    {getStatusIcon(k)}
                    {k}: {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="apps-toolbar">
            <div className="toolbar-group">
              <Filter size={16} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="apps-input">
                <option value="all">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <label className="apps-checkbox">
              <input type="checkbox" checked={viewedOnly} onChange={(e) => setViewedOnly(e.target.checked)} />
              <Eye size={14} />
              Viewed only
            </label>
            <div className="toolbar-group">
              <Search size={16} />
              <input
                placeholder="Filter by email domain"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="apps-input"
              />
            </div>
            <div className="toolbar-group">
              <Star size={16} />
              <input
                type="number"
                placeholder="Min score"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                className="apps-input narrow"
              />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="apps-input">
              <option value="appliedAt_desc">Newest applied</option>
              <option value="appliedAt_asc">Oldest applied</option>
              <option value="score_desc">Score high → low</option>
              <option value="score_asc">Score low → high</option>
              <option value="name_az">Name A → Z</option>
            </select>
            <button onClick={exportCSV} className="apps-btn secondary" disabled={filtered.length === 0}>
              <Download size={16} />
              Export CSV
            </button>
            <button onClick={markAllViewed} className="apps-btn secondary" disabled={filtered.length === 0 || isBulkUpdating}>
              {isBulkUpdating ? <Loader2 size={16} className="spin" /> : <Eye size={16} />}
              Mark all viewed
            </button>
            <select onChange={(e) => e.target.value && setStatusForAll(e.target.value)} defaultValue="" className="apps-input" disabled={filtered.length === 0 || isBulkUpdating}>
              <option value="" disabled>Set status for all</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="apps-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading applicants...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="apps-empty-state">
              <Users size={64} />
              <h3>No applicants found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="apps-list">
              {filtered.map((a, idx) => (
                <div key={a.id} className="apps-card" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="apps-card-header">
                    <div className="apps-card-main">
                      <div className="apps-card-title-row">
                        <h4 className="apps-name">{a.fullName}</h4>
                        <div className={`apps-status-badge status-${(a.status || 'pending').toLowerCase()}`}>
                          {getStatusIcon(a.status || 'pending')}
                          {a.status || 'pending'}
                        </div>
                      </div>
                      <div className="apps-contact-info">
                        <span className="contact-item">
                          <Mail size={14} />
                          {a.email}
                        </span>
                        {a.phone && (
                          <span className="contact-item">
                            <Phone size={14} />
                            {a.phone}
                          </span>
                        )}
                        <span className="contact-item">
                          <Calendar size={14} />
                          {a.appliedAt?.toDate ? a.appliedAt.toDate().toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : '—'}
                        </span>
                      </div>
                      {a.userSnapshot?.location && (
                        <div className="apps-chip">
                          <MapPin size={12} />
                          {a.userSnapshot.location}
                        </div>
                      )}
                      {Array.isArray(a.userSnapshot?.skills) && a.userSnapshot.skills.length > 0 && (
                        <div className="apps-skill-row">
                          {a.userSnapshot.skills.slice(0, 5).map((skill: string) => (
                            <span key={skill} className="apps-chip skill">
                              <Sparkles size={10} />
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="apps-actions">
                    {a.cvBase64 ? (
                      <a
                        href={a.cvBase64}
                        download={a.cvFileName || 'cv'}
                        className="apps-btn primary"
                      >
                        <Download size={16} />
                        Download CV
                      </a>
                    ) : null}
                    <button 
                      onClick={() => markViewed(a.id)} 
                      className={`apps-btn ${a.viewed ? 'viewed' : ''}`}
                      disabled={actionLoading[`view-${a.id}`]}
                    >
                      {actionLoading[`view-${a.id}`] ? (
                        <Loader2 size={16} className="spin" />
                      ) : a.viewed ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                      {a.viewed ? 'Viewed' : 'Mark viewed'}
                    </button>
                    <select
                      value={a.status || 'pending'}
                      onChange={(e) => updateStatus(a.id, e.target.value as any)}
                      className="apps-input status-select"
                      disabled={actionLoading[`status-${a.id}`]}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="apps-card-bottom">
                    <div className="score-section-wrapper">
                      <div className="section-header">
                        <Star size={18} />
                        <span className="section-title">Applicant Score</span>
                        {typeof a.score === 'number' && (
                          <div className="current-score-badge">
                            Current: {a.score}/100
                          </div>
                        )}
                      </div>
                      <div className="score-section">
                        <div className="input-group">
                          <input
                            type="number"
                            placeholder="Enter score (0-100)"
                            value={scoreDrafts[a.id] ?? ''}
                            onChange={(e) => setScoreDrafts(prev => ({ ...prev, [a.id]: e.target.value }))}
                            className="apps-input score-input"
                            min="0"
                            max="100"
                          />
                          <span className="input-hint">/ 100</span>
                        </div>
                        <button 
                          onClick={() => saveScore(a.id)} 
                          className="apps-btn primary"
                          disabled={actionLoading[`score-${a.id}`] || !scoreDrafts[a.id]?.trim()}
                        >
                          {actionLoading[`score-${a.id}`] ? (
                            <>
                              <Loader2 size={16} className="spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save size={16} />
                              Save Score
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="note-section-wrapper">
                      <div className="section-header">
                        <MessageSquare size={18} />
                        <span className="section-title">Add Note</span>
                        {Array.isArray(a.notes) && a.notes.length > 0 && (
                          <div className="notes-count-badge">
                            {a.notes.length} note{a.notes.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      <div className="note-section">
                        <div className="input-group">
                          <textarea
                            placeholder="Write your note here..."
                            value={noteDrafts[a.id] ?? ''}
                            onChange={(e) => setNoteDrafts(prev => ({ ...prev, [a.id]: e.target.value }))}
                            className="apps-textarea"
                            rows={3}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                addNote(a.id);
                              }
                            }}
                          />
                        </div>
                        <button 
                          onClick={() => addNote(a.id)} 
                          className="apps-btn primary"
                          disabled={actionLoading[`note-${a.id}`] || !noteDrafts[a.id]?.trim()}
                        >
                          {actionLoading[`note-${a.id}`] ? (
                            <>
                              <Loader2 size={16} className="spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <MessageSquare size={16} />
                              Add Note
                            </>
                          )}
                        </button>
                        <div className="note-hint">
                          Press Ctrl+Enter to save quickly
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="apps-meta-row">
                    <span className={a.viewed ? 'meta-viewed' : 'meta-not-viewed'}>
                      {a.viewed ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {a.viewed ? 'Viewed' : 'Not viewed'}
                    </span>
                    <span>
                      <Star size={12} />
                      Score: {typeof a.score === 'number' ? `${a.score}/100` : '—'}
                    </span>
                    <span>
                      <Globe size={12} />
                      {a.emailDomain || '—'}
                    </span>
                  </div>

                  {Array.isArray(a.notes) && a.notes.length > 0 && (
                    <div className="apps-notes">
                      <div className="apps-notes-title">
                        <MessageSquare size={14} />
                        Notes History ({a.notes.length})
                      </div>
                      <ul className="apps-notes-list">
                        {a.notes.slice().reverse().map((n: any, idx: number) => (
                          <li key={idx}>
                            <div className="note-content">
                              <FileText size={12} />
                              <span>{n.note}</span>
                            </div>
                            {n.at?.toDate && (
                              <span className="apps-note-date">
                                {n.at.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
