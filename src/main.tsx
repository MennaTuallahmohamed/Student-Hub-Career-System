import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registar from './pages/Registar'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'
import Courses from './pages/Courses'
import Jobs from './pages/jobs'
import Ai from './pages/ai'
import Apply from './pages/Apply'
import ProfilePage from './pages/ProfilePage'
import ConfirmationPage from './pages/ConfirmationPage'
import AddCourse from './pages/AddCourse'
import AddExercises from './pages/AddExercises'

import EditCourse from './pages/EditCourse'
import Applicants from './pages/Applicants'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Registar />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course" element={<EditCourse />} /> 
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/addExercises" element={<AddExercises />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '4rem', color: '#e11d48' }}>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/jobs" style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              background: '#3b82f6', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px' 
            }}>
              Back to Jobs
            </a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)