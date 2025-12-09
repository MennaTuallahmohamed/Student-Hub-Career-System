
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { CourseService, ExercisesService } from '../firebase/src/firebaseServices';
import { 
  BookOpen, Upload, DollarSign, Tag, FileText, User, Clock, 
  Plus, X, Star, Award, Globe, Calendar, Users, Link, 
  Video, Image, File, Zap, Target, CheckCircle, ArrowLeft
} from 'lucide-react';
import './AddCourse.css';

const AddCourse = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // ⚠️ تم حذف حقل `lessons` من هنا
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    instructor: '',
    duration: '',
    difficulty: '',
    certificate: false,
    overview: '',
    requirements: '',
    whatYouLearn: '',
  });

  const [courseLinks, setCourseLinks] = useState<Array<{id: string, title: string, url: string, type: string}>>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const { UserService } = await import('../firebase/src/firebaseServices');
        const data = await UserService.getUserData(user.uid);
        setUserData(data);
        setLoading(false);
      } else {
        setLoading(false);
        navigate('/signin');
      }
    };
    fetchUserData();
  }, [user, navigate]);

  // التحقق من الصلاحية بعد تحميل البيانات
  useEffect(() => {
    if (!loading && userData && userData.role !== 'teacher') {
      alert('ليس لديك صلاحية رفع كورسات. يجب أن تكون مُدرّسًا.');
      navigate('/courses');
    }
  }, [loading, userData, navigate]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addCourseLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: '',
      url: '',
      type: 'video'
    };
    setCourseLinks(prev => [...prev, newLink]);
  };

  const removeCourseLink = (id: string) => {
    setCourseLinks(prev => prev.filter(link => link.id !== id));
  };

  const updateCourseLink = (id: string, field: string, value: string) => {
    setCourseLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError(null);
    try {
      await CourseService.uploadCourse(
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price,
          instructor: formData.instructor,
          duration: formData.duration,
          lessons: courseLinks.length, 
          difficulty: formData.difficulty,
          certificate: formData.certificate,
          overview: formData.overview,
          requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req),
          whatYouLearn: formData.whatYouLearn.split(',').map(item => item.trim()).filter(item => item),
          courseLinks: courseLinks,
          thumbnail: thumbnail || undefined,
        },
        user.uid
      );
      console.log('🔥 Course created successfully!', {
        title: formData.title,
        category: formData.category,
        courseLinks: courseLinks.length
      });
      alert('Course created successfully! 🎉');
      navigate('/courses');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while creating the course.');
    } finally {
      setSubmitting(false);
    }
  };

 if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "35px 45px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          color: "#444",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "3px solid rgba(0,0,0,0.08)",
            borderTop: "3px solid #9b87f5", // soft lavender accent
            borderRadius: "50%",
            margin: "0 auto 18px",
            animation: "spin 1.2s ease-in-out infinite",
          }}
        />

        <h3 style={{ marginBottom: "6px", fontWeight: 600, color: "#333" }}>
          Loading...
        </h3>
        <p style={{ fontSize: "14px", color: "#777" }}>
          Please wait a moment ✨
        </p>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '30px'
      }}>
        <button 
          onClick={() => navigate('/courses')}
          style={{
            background: '#3a25ff',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
             onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2d1bd0ff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2d1bd0ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
        >
          <ArrowLeft size={20} />
          Back to Courses
        </button>
      </div>

      {/* Main Form Container */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #3a25ff 0%, #5a4bff 100%)',
          padding: '40px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              backdropFilter: 'blur(10px)'
            }}>
              <BookOpen size={40} color="white" />
            </div>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              marginBottom: '12px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Create Amazing Course
            </h1>
            <p style={{ 
              fontSize: '18px', 
              opacity: 0.9,
              fontWeight: '300'
            }}>
              Build a professional course and share your expertise with students worldwide
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white',
            padding: '16px 24px',
            margin: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(255,107,107,0.3)'
          }}>
            {error}
          </div>
        )}

        {/* Form Content */}
        <div style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit}>
            {/* Course Title */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <BookOpen size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Course Title
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Learn React from Scratch"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3a25ff';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Course Description */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <FileText size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Course Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your course in detail..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Course Links Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <label style={{ 
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Link size={24} />
                  Course Links & Resources
                </label>
                <button
                  type="button"
                  onClick={addCourseLink}
                  style={{
                    background: 'linear-gradient(135deg, #3a25ff, #5a4bff)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(58, 37, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(58, 37, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(58, 37, 255, 0.3)';
                  }}
                >
                  <Plus size={16} />
                  Add Link
                </button>
              </div>
              {courseLinks.length === 0 ? (
                <div style={{
                  background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                  border: '2px dashed #cbd5e0',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  color: '#718096'
                }}>
                  <Link size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <h3 style={{ marginBottom: '8px', color: '#4a5568' }}>No Links Added Yet</h3>
                  <p>Add course materials, videos, documents, and other resources</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {courseLinks.map((link, index) => (
                    <div key={link.id} style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '20px',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          {link.type === 'video' && <Video size={20} color="#3a25ff" />}
                          {link.type === 'document' && <File size={20} color="#3a25ff" />}
                          {link.type === 'image' && <Image size={20} color="#3a25ff" />}
                          {link.type === 'other' && <Link size={20} color="#3a25ff" />}
                          <span style={{ fontWeight: '600', color: '#2d3748' }}>
                            Link #{index + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCourseLink(link.id)}
                          style={{
                            background: '#fed7d7',
                            color: '#e53e3e',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#feb2b2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fed7d7';
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '8px', 
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#4a5568'
                          }}>
                            Link Title
                          </label>
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => updateCourseLink(link.id, 'title', e.target.value)}
                            placeholder="e.g., Introduction Video"
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.3s ease',
                              background: '#f8fafc'
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = '#3a25ff';
                              e.currentTarget.style.background = 'white';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = '#e2e8f0';
                              e.currentTarget.style.background = '#f8fafc';
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '8px', 
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#4a5568'
                          }}>
                            URL
                          </label>
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateCourseLink(link.id, 'url', e.target.value)}
                            placeholder="https://example.com"
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.3s ease',
                              background: '#f8fafc'
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = '#3a25ff';
                              e.currentTarget.style.background = 'white';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = '#e2e8f0';
                              e.currentTarget.style.background = '#f8fafc';
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '8px', 
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#4a5568'
                          }}>
                            Type
                          </label>
                          <select
                            value={link.type}
                            onChange={(e) => updateCourseLink(link.id, 'type', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.3s ease',
                              background: '#f8fafc',
                              cursor: 'pointer'
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = '#3a25ff';
                              e.currentTarget.style.background = 'white';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = '#e2e8f0';
                              e.currentTarget.style.background = '#f8fafc';
                            }}
                          >
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                            <option value="image">Image</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <Tag size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="">Choose Category</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
                <option value="languages">Languages</option>
                <option value="data-science">Data Science</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="ai-ml">AI & Machine Learning</option>
                <option value="cybersecurity">Cybersecurity</option>
              </select>
            </div>

            {/* Instructor */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <User size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Instructor Name
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
                placeholder="e.g., John Smith"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Duration */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <Clock size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Course Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="e.g., 1 hour, 40 Minutes, 32 hours"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* ⚠️ تم حذف قسم "Number of Lessons" بالكامل */}

            {/* Difficulty */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <Target size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="">Choose Difficulty Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Beginner to Advanced">Beginner to Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <DollarSign size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Price (USD)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g., 49.99 or Free"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Certificate */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748',
                cursor: 'pointer',
                padding: '16px 20px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#3a25ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
              >
                <input
                  type="checkbox"
                  name="certificate"
                  checked={formData.certificate}
                  onChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.checked }))}
                  style={{ 
                    transform: 'scale(1.3)',
                    accentColor: '#3a25ff'
                  }}
                />
                <Award size={20} style={{ color: '#3a25ff' }} />
                <span>Course Completion Certificate</span>
              </label>
            </div>

            {/* Overview */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <Globe size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Course Overview
              </label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                required
                placeholder="Provide a comprehensive description of your course..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Requirements */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <CheckCircle size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Requirements (comma-separated)
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g., Basic programming knowledge, Computer, Internet connection"
                rows={3}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* What You'll Learn */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <Zap size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                What Students Will Learn (comma-separated)
              </label>
              <textarea
                name="whatYouLearn"
                value={formData.whatYouLearn}
                onChange={handleChange}
                placeholder="e.g., Learn programming fundamentals, Build web applications, Use development tools"
                rows={3}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58, 37, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Thumbnail */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: '700',
                fontSize: '16px',
                color: '#2d3748'
              }}>
                <Image size={20} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
                Course Thumbnail
              </label>
              <div
                onClick={() => document.getElementById('thumbnail-input')?.click()}
                style={{
                  border: '2px dashed #cbd5e0',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3a25ff';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f0f4ff, #e6f3ff)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(58, 37, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e0';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f7fafc, #edf2f7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {previewUrl ? (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={previewUrl}
                      alt="Course Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(58, 37, 255, 0.9)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Preview
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #3a25ff, #5a4bff)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 4px 12px rgba(58, 37, 255, 0.3)'
                    }}>
                      <Upload size={32} color="white" />
                    </div>
                    <h3 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '18px' }}>
                      Upload Course Thumbnail
                    </h3>
                    <p style={{ color: '#718096', marginBottom: '16px' }}>
                      Click to select an image (JPG, PNG, GIF)
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(58, 37, 255, 0.1)',
                      color: '#3a25ff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      <Image size={16} />
                      Choose File
                    </div>
                  </div>
                )}
                <input
                  id="thumbnail-input"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '2px solid #e2e8f0'
            }}>
              <button
                type="button"
                onClick={() => navigate('/courses')}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, #718096, #4a5568)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(113, 128, 150, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowLeft size={20} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  flex: 2,
                  padding: '16px 24px',
                  background: submitting 
                    ? 'linear-gradient(135deg, #a0aec0, #718096)' 
                    : 'linear-gradient(135deg, #3a25ff, #5a4bff)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: submitting 
                    ? 'none' 
                    : '0 8px 25px rgba(58, 37, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(58, 37, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(58, 37, 255, 0.4)';
                  }
                }}
              >
                {submitting ? (
                  <>
                    <div className="loading-spinner" style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%'
                    }}></div>
                    Creating Course...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Create Amazing Course
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;