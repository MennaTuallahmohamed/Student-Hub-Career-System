// src/pages/EditCourse.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { CourseData, CourseService } from '../firebase/src/firebaseServices';

const EditCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/signin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // جلب الكورسات الخاصة بالمدرس
  useEffect(() => {
    if (!currentUser) return;

    const fetchCourses = async () => {
      try {
        const myCourses = await CourseService.getMyCourses(currentUser.uid);
        setCourses(myCourses);
      } catch (err) {
        console.error('Error loading courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentUser]);

  const handleEdit = (course: CourseData) => {
    setSelectedCourse(course);
  };

  const handleSave = async () => {
    if (!selectedCourse || !currentUser || !selectedCourse.id) return;
    setSaving(true);
    try {
      await CourseService.updateCourse(selectedCourse.id, selectedCourse, currentUser.uid);
      alert('✅ Course updated successfully!');
      // إعادة تحميل القائمة
      const updated = await CourseService.getMyCourses(currentUser.uid);
      setCourses(updated);
      setSelectedCourse(null);
    } catch (err: any) {
      alert('❌ ' + (err.message || 'Failed to save changes.'));
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = () => {
    if (!selectedCourse) return;
    const newLinks = [
      ...(selectedCourse.courseLinks || []),
      { id: Date.now().toString(), title: '', url: '', type: 'video' }
    ];
    setSelectedCourse({ ...selectedCourse, courseLinks: newLinks });
  };

  const handleRemoveLink = (index: number) => {
    if (!selectedCourse) return;
    const newLinks = selectedCourse.courseLinks.filter((_, i) => i !== index);
    setSelectedCourse({ ...selectedCourse, courseLinks: newLinks });
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', fontSize: '1.2rem' }}>Loading your courses...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.5rem', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '1.5rem' }}>Edit My Courses</h2>

      {courses.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>You haven't created any courses yet.</p>
      ) : (
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Your Courses:</h3>
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h4>{course.title}</h4>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>
                {course.category} • {course.duration} • {course.price || 'Free'}
              </p>
              <button
                onClick={() => handleEdit(course)}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* نموذج التعديل */}
      {selectedCourse && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          <h3>Edit: {selectedCourse.title}</h3>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Course Title</strong></label>
            <input
              type="text"
              value={selectedCourse.title}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Description</strong></label>
            <textarea
              value={selectedCourse.description}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
              rows={3}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Category</strong></label>
            <input
              type="text"
              value={selectedCourse.category}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, category: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Instructor</strong></label>
            <input
              type="text"
              value={selectedCourse.instructor}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, instructor: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Duration</strong></label>
            <input
              type="text"
              value={selectedCourse.duration}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, duration: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Price (USD)</strong></label>
            <input
              type="text"
              value={selectedCourse.price || ''}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, price: e.target.value })}
              placeholder="e.g., 49.99 or Free"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Difficulty</strong></label>
            <select
              value={selectedCourse.difficulty}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, difficulty: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="checkbox"
                checked={selectedCourse.certificate}
                onChange={(e) => setSelectedCourse({ ...selectedCourse, certificate: e.target.checked })}
                style={{ marginRight: '0.5rem' }}
              />
              <strong>Course Completion Certificate</strong>
            </label>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4><strong>Course Links</strong></h4>
              <button
                onClick={handleAddLink}
                style={{
                  padding: '0.3rem 0.8rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                + Add Link
              </button>
            </div>
            {(selectedCourse.courseLinks || []).map((link, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) => {
                    const newLinks = [...selectedCourse.courseLinks];
                    newLinks[i] = { ...newLinks[i], title: e.target.value };
                    setSelectedCourse({ ...selectedCourse, courseLinks: newLinks });
                  }}
                  style={{ flex: 1, padding: '0.4rem' }}
                />
                <input
                  type="text"
                  placeholder="YouTube URL"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...selectedCourse.courseLinks];
                    newLinks[i] = { ...newLinks[i], url: e.target.value };
                    setSelectedCourse({ ...selectedCourse, courseLinks: newLinks });
                  }}
                  style={{ flex: 2, padding: '0.4rem' }}
                />
                <button
                  onClick={() => handleRemoveLink(i)}
                  style={{
                    padding: '0.4rem 0.6rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label><strong>Overview</strong></label>
            <textarea
              value={selectedCourse.overview || ''}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, overview: e.target.value })}
              rows={3}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              placeholder="Course overview..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: saving ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            onClick={() => setSelectedCourse(null)}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCourse;