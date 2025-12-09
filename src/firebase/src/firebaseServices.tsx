// src/firebase/services.ts

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';

interface UserData {
  id: string;
  uid: string;
  email: string;
  role: 'student' | 'teacher';
  displayName: string;
  photoURL: string | null;
  phone: string | null;
  location: string | null;
  createdAt: Date;
  appliedJobs: number;
  coursesEnrolled: number;
  coursesCreated: number;
  sharedNotes: number;
  downloads: number;
  exercisesCompleted: number;
  cvUploaded: boolean;
  cvDetails: any;
  registeredCourses: any[];
  appliedJobsList: any[];
  interestedJobs: any[];
  skills: string[];
  firstName?: string;
  lastName?: string;
}


interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  description: string;
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correct: number;
    }[];
  };
}

export interface CourseData {
  id?: string;
  title: string;
  description: string;
  category: string;
  price?: string;
  instructor: string;
  duration: string;
  lessons: number | Lesson[];
  difficulty: string;
  certificate: boolean;
  overview: string;
  requirements: string[];
  whatYouLearn: string[];
  courseLinks: Array<{ id: string; title: string; url: string; type: string }>;
  thumbnail?: File | string | null;
  teacherId?: string;
  teacherName?: string;
  createdAt?: any;
  students?: any[];
  rating?: number;
  reviews?: number;
  studentsCount?: number;
  modules?: number;
  level?: string;
  originalPrice?: string | null;
  progress?: number;
}

interface ExerciseData {
  id?: string | number;
  title: string;
  difficulty: string;
  duration: string;
  points: number;
  completed?: boolean;
  questions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  addDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';

export const AuthService = {
  signUp: async (
    email: string,
    password: string,
    role: 'student' | 'teacher' = 'student',
    additionalData: Record<string, any> = {}
  ): Promise<User> => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', res.user.uid), {
      uid: res.user.uid,
      email,
      role,
      displayName: email.split('@')[0],
      photoURL: null,
      phone: null,
      location: null,
      createdAt: serverTimestamp(),
      appliedJobs: 0,
      coursesEnrolled: 0,
      coursesCreated: 0,
      sharedNotes: 0,
      downloads: 0,
      exercisesCompleted: 0,
      cvUploaded: false,
      cvDetails: null,
      registeredCourses: [],
      appliedJobsList: [],
      interestedJobs: [],
      ...additionalData,
    });
    return res.user;
  },

  getUserData: async (userId: string): Promise<UserData | null> => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    return userSnapshot.exists() ? { id: userSnapshot.id, ...userSnapshot.data() } as UserData : null;
  },

  signIn: async (email: string, password: string): Promise<User> => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  },

  signOut: async (): Promise<void> => {
    await signOut(auth);
  },

  onAuthChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
};

export const UserService = {
  getUserData: async (userId: string): Promise<UserData | null> => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    return userSnapshot.exists() ? { id: userSnapshot.id, ...userSnapshot.data() } as UserData : null;
  },

  getAllUsers: async () => {
    const usersCollectionRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollectionRef);
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  incrementField: async (userId: string, field: string) => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      const currentValue = data[field] || 0;
      await updateDoc(userDocRef, { [field]: currentValue + 1 });
    }
  },
  // we2ft l7d hena
  updateUserField: async (userId: string, field: string, value: number) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { [field]: value });
  },

  updateUserData: async (userId: string, data: Record<string, any>) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, data);
  },

  uploadProfileImage: async (userId: string, file: File): Promise<string> => {
    const storageRef = ref(storage, `profile-images/${userId}`);
    try {
      await deleteObject(storageRef);
    } catch (error) {

    }

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await updateDoc(doc(db, 'users', userId), { photoURL: downloadURL });

    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid === userId) {
      await updateProfile(currentUser, { photoURL: downloadURL });
    }

    return downloadURL;
  },

  deleteProfileImage: async (userId: string) => {
    const storageRef = ref(storage, `profile-images/${userId}`);
    try {
      await deleteObject(storageRef);
      await updateDoc(doc(db, 'users', userId), { photoURL: null });
    } catch (error) {
      console.error('Error deleting profile image:', error);
    }
  },

  updateUserStats: async (userId: string) => {
    try {
      const applicationsQuery = query(
        collection(db, 'applications'),
        where('userId', '==', userId)
      );
      const applicationsSnapshot = await getDocs(applicationsQuery);
      const appliedJobsCount = applicationsSnapshot.docs.length;

      const userDocRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) return;

      const userData = userSnapshot.data();
      const coursesEnrolledCount = (userData.registeredCourses || []).length;

      await updateDoc(userDocRef, {
        appliedJobs: appliedJobsCount,
        coursesEnrolled: coursesEnrolledCount,
        cvUploads: appliedJobsCount,
      });

      return {
        appliedJobs: appliedJobsCount,
        coursesEnrolled: coursesEnrolledCount,
        cvUploads: appliedJobsCount,
      };
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw error;
    }
  },
};

export const NotesService = {
  uploadNote: async (file: File, userId: string) => {
    const storageRef = ref(storage, `notes/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'notes'), {
      fileName: file.name,
      fileURL,
      userId,
      uploadedAt: serverTimestamp(),
      shared: false,
    });

    await UserService.incrementField(userId, 'downloads');
    return fileURL;
  },
};

export const ApplicationsService = {
  updateStatus: async (applicationId: string, nextStatus: 'pending' | 'reviewing' | 'interview' | 'offered' | 'rejected' | 'hired') => {
    const appRef = doc(db, 'applications', applicationId);
    const snap = await getDoc(appRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const history = Array.isArray(data.statusHistory) ? data.statusHistory : [];
    await updateDoc(appRef, {
      status: nextStatus,
      stage: nextStatus,
      lastUpdatedAt: serverTimestamp(),
      statusHistory: [...history, { status: nextStatus, at: serverTimestamp() }],
    });
    if (data.jobId) {
      await JobService.updateApplicantsAggregates(String(data.jobId));
    }
  },
  markViewed: async (applicationId: string) => {
    const appRef = doc(db, 'applications', applicationId);
    const snap = await getDoc(appRef);
    if (!snap.exists()) return;
    const data = snap.data();
    await updateDoc(appRef, { viewed: true, viewedAt: serverTimestamp(), lastUpdatedAt: serverTimestamp() });
    if (data.jobId) {
      await JobService.updateApplicantsAggregates(String(data.jobId));
    }
  },
  addNote: async (applicationId: string, note: string) => {
    const appRef = doc(db, 'applications', applicationId);
    const snap = await getDoc(appRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const notes = Array.isArray(data.notes) ? data.notes : [];
    await updateDoc(appRef, { notes: [...notes, { note, at: serverTimestamp() }], lastUpdatedAt: serverTimestamp() });
  },

  scoreApplicant: async (applicationId: string, score: number) => {
    const appRef = doc(db, 'applications', applicationId);
    await updateDoc(appRef, { score, lastUpdatedAt: serverTimestamp() });
  },
  getByJob: async (jobId: string) => {
    const qApps = query(collection(db, 'applications'), where('jobId', '==', jobId));
    const snap = await getDocs(qApps);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  getStats: async (jobId: string) => {
    const apps = await ApplicationsService.getByJob(jobId);
    const byStatus: Record<string, number> = {};
    const domains: Record<string, number> = {};
    let viewed = 0;
    const userIds = new Set<string>();
    apps.forEach((a: any) => {
      const s = a.status || 'pending';
      byStatus[s] = (byStatus[s] || 0) + 1;
      if (a.viewed) viewed += 1;
      const d = a.emailDomain;
      if (d) domains[d] = (domains[d] || 0) + 1;
      if (a.userId) userIds.add(String(a.userId));
      else if (a.email) userIds.add(`email:${a.email}`);
    });
    const total = apps.length;
    return { total, byStatus, viewed, domains, uniqueApplicants: userIds.size };
  },
};

export const JobService = {
  updateApplicantsAggregates: async (jobId: string) => {
    const stats = await ApplicationsService.getStats(jobId);
    const topDomains = Object.entries(stats.domains)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      applicantsCount: stats.total,
      applicantsByStatus: stats.byStatus,
      applicantsViewedCount: stats.viewed,
      topEmailDomains: topDomains,
      uniqueApplicants: stats.uniqueApplicants,
      aggregatesUpdatedAt: serverTimestamp(),
    });
  },
};
export const CourseService = {
  uploadCourse: async (courseData: CourseData, userId: string) => {
    const userData = await UserService.getUserData(userId);

    if (!userData || userData.role !== 'teacher') {
      throw new Error('ليس لديك صلاحية رفع كورسات. يجب أن تكون مُدرّسًا.');
    }

    let thumbnailUrl = null;
    if (courseData.thumbnail && courseData.thumbnail instanceof File) {
      const thumbnailRef = ref(storage, `courses/${userId}/${Date.now()}_${courseData.thumbnail.name}`);
      const snapshot = await uploadBytes(thumbnailRef, courseData.thumbnail);
      thumbnailUrl = await getDownloadURL(snapshot.ref);
    }

    const lessons: Lesson[] = courseData.courseLinks.map((link, index) => ({
      id: index + 1,
      title: link.title || `Lesson ${index + 1}`,
      duration: '00:00',
      videoUrl: link.url || '',
      completed: false,
      description: `This is ${link.title || `lesson ${index + 1}`}.`,
    }));

    const courseRef = await addDoc(collection(db, 'courses'), {
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      price: courseData.price || 'Free',
      instructor: courseData.instructor,
      duration: courseData.duration,
      lessons: lessons,
      difficulty: courseData.difficulty,
      certificate: courseData.certificate,
      overview: courseData.overview,
      requirements: courseData.requirements,
      whatYouLearn: courseData.whatYouLearn,
      courseLinks: courseData.courseLinks,
      thumbnail: thumbnailUrl,
      teacherId: userId,
      teacherName: userData.displayName || `${userData.firstName} ${userData.lastName}`.trim() || 'مُدرّس',
      createdAt: serverTimestamp(),
      students: [],
      rating: 0,
      reviews: 0,
      studentsCount: 0,
      modules: courseData.courseLinks.length,
      level: courseData.difficulty,
      originalPrice: null,
      progress: 0,
    });

    await UserService.incrementField(userId, 'coursesCreated');

    return { id: courseRef.id, ...courseData, thumbnail: thumbnailUrl };
  },

  getAllCourses: async () => {
    try {
      console.log('🔥 Fetching courses from Firebase...');
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      console.log('🔥 Courses snapshot:', coursesSnapshot);
      console.log('🔥 Number of courses found:', coursesSnapshot.docs.length);

      const courses = coursesSnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log('🔥 Course data:', { id: doc.id, title: data.title });
        return { id: doc.id, ...data } as CourseData;
      });

      console.log('🔥 All courses:', courses);
      return courses;
    } catch (error) {
      console.error('🔥 Error fetching courses from Firebase:', error);
      throw error;
    }
  },

  getCoursesByTeacher: async (teacherId: string) => {
    const q = query(collection(db, 'courses'), where('teacherId', '==', teacherId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CourseData));
  },

  getMyCourses: async (teacherId: string) => {
    const q = query(collection(db, 'courses'), where('teacherId', '==', teacherId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CourseData));
  },


  // ✅ الدالة الجديدة المطلوبة: تعديل الكورس من المدرس اللي رفعه فقط
  updateCourse: async (courseId: string, updatedData: Partial<CourseData>, userId: string) => {
    const courseDocRef = doc(db, 'courses', courseId);
    const courseSnapshot = await getDoc(courseDocRef);

    if (!courseSnapshot.exists()) {
      throw new Error('الكورس غير موجود');
    }

    const existingCourse = courseSnapshot.data();

    // 🔐 التحقق: هل الكورس ملك هذا المدرس؟
    if (existingCourse.teacherId !== userId) {
      throw new Error('ليس لديك صلاحية تعديل هذا الكورس');
    }

    let thumbnailUrl = existingCourse.thumbnail;
    if (updatedData.thumbnail && updatedData.thumbnail instanceof File) {
      const thumbnailRef = ref(storage, `courses/${userId}/${Date.now()}_${updatedData.thumbnail.name}`);
      const snapshot = await uploadBytes(thumbnailRef, updatedData.thumbnail);
      thumbnailUrl = await getDownloadURL(snapshot.ref);
    }


    let lessonsUpdate: Lesson[] | undefined = undefined;
    if (updatedData.courseLinks) {
      lessonsUpdate = updatedData.courseLinks.map((link, index) => ({
        id: index + 1,
        title: link.title || `Lesson ${index + 1}`,
        duration: '00:00',
        videoUrl: link.url || '',
        completed: false,
        description: `This is ${link.title || `lesson ${index + 1}`}.`,
      }));
    }


    const dataToUpdate: any = {
      ...updatedData,
      thumbnail: thumbnailUrl,
      updatedAt: serverTimestamp(),
    };


    if (lessonsUpdate) {
      dataToUpdate.lessons = lessonsUpdate;
      dataToUpdate.modules = lessonsUpdate.length;
    }


    delete dataToUpdate.teacherId;
    delete dataToUpdate.createdAt;
    delete dataToUpdate.id;

    await updateDoc(courseDocRef, dataToUpdate);

    return { id: courseId, ...dataToUpdate };
  },

  enrollCourse: async (courseId: string, userId: string, courseData: CourseData) => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error('User does not exist');
    }


    const userData = userSnapshot.data();
    const registeredCourses = userData.registeredCourses || [];


    const isAlreadyEnrolled = registeredCourses.some((c: any) =>
      c.id === courseId || c.courseId === courseId
    );

    if (isAlreadyEnrolled) {
      throw new Error('You are already enrolled in this course');
    }


    const courseToAdd = {
      id: courseId,
      courseId: courseId,
      title: courseData.title,
      description: courseData.description,
      thumbnail: courseData.thumbnail,
      instructor: courseData.instructor,
      duration: courseData.duration,
      level: courseData.level || courseData.difficulty,
      price: courseData.price,
      certificate: courseData.certificate,
      enrolledAt: new Date(),
      progress: 0,
    };

    await updateDoc(userDocRef, {
      registeredCourses: arrayUnion(courseToAdd),
      coursesEnrolled: (userData.coursesEnrolled || 0) + 1,
    });

    return courseToAdd;
  },


  getEnrolledCourses: async (userId: string) => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      return [];
    }

    const userData = userSnapshot.data();
    return userData.registeredCourses || [];
  },
};

////////////////////////////////
//Adding Exercises 
///////////////////////////////

export const ExercisesService = {
  uploadExercises: async (exercise: ExerciseData, userId: string) => {
    const userData = await UserService.getUserData(userId);

    if (!userData || userData.role !== 'teacher') {
      throw new Error('You do not have permission to upload exercises. You must be a teacher.');
    }

    const exerciseRef = await addDoc(collection(db, 'exercises'), {
      title: exercise.title,
      difficulty: exercise.difficulty,
      duration: exercise.duration,
      points: exercise.points || 0,
      completed: exercise.completed || false,
      questions: exercise.questions || [],
      teacherId: userId,
      teacherName:
        userData.displayName ||
        `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
        'Teacher',

      createdAt: serverTimestamp(),
      rating: 0,
      reviews: 0,
      studentsCount: 0,
      progress: 0,
    });

    await UserService.incrementField(userId, 'exercisesCreated');

    return { id: exerciseRef.id, ...exercise };
  },

  getAllExercises: async () => {
    try {
      console.log('🔥 Fetching exercises from Firebase...');
      const exercisesSnapshot = await getDocs(collection(db, 'exercises'));
      console.log('🔥 Exercises snapshot:', exercisesSnapshot);
      console.log('🔥 Number of exercises found:', exercisesSnapshot.docs.length);

      const exercises = exercisesSnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log('🔥 exercises data:', { id: doc.id, title: data.title });
        return { id: doc.id, ...data };
      });

      console.log('🔥 All exercises:', exercises);
      return exercises;
    } catch (error) {
      console.error('🔥 Error fetching exercises from Firebase:', error);
      throw error;
    }
  },

  getExercisesByTeacher: async (teacherId: string) => {
    const q = query(collection(db, 'exercises'), where('teacherId', '==', teacherId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
};