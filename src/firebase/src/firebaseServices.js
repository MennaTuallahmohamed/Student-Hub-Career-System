// src/firebase/services.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, updateDoc, getDocs, query, where, addDoc, arrayUnion, serverTimestamp, } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';
export const AuthService = {
    signUp: (email_1, password_1, ...args_1) => __awaiter(void 0, [email_1, password_1, ...args_1], void 0, function* (email, password, role = 'student', additionalData = {}) {
        const res = yield createUserWithEmailAndPassword(auth, email, password);
        yield setDoc(doc(db, 'users', res.user.uid), Object.assign({ uid: res.user.uid, email,
            role, displayName: email.split('@')[0], photoURL: null, phone: null, location: null, createdAt: serverTimestamp(), appliedJobs: 0, coursesEnrolled: 0, coursesCreated: 0, sharedNotes: 0, downloads: 0, exercisesCompleted: 0, cvUploaded: false, cvDetails: null, registeredCourses: [], appliedJobsList: [], interestedJobs: [] }, additionalData));
        return res.user;
    }),
    getUserData: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        const userSnapshot = yield getDoc(userDocRef);
        return userSnapshot.exists() ? Object.assign({ id: userSnapshot.id }, userSnapshot.data()) : null;
    }),
    signIn: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield signInWithEmailAndPassword(auth, email, password);
        return res.user;
    }),
    signOut: () => __awaiter(void 0, void 0, void 0, function* () {
        yield signOut(auth);
    }),
    onAuthChange: (callback) => {
        return onAuthStateChanged(auth, callback);
    },
};
export const UserService = {
    getUserData: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        const userSnapshot = yield getDoc(userDocRef);
        return userSnapshot.exists() ? Object.assign({ id: userSnapshot.id }, userSnapshot.data()) : null;
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const usersCollectionRef = collection(db, 'users');
        const usersSnapshot = yield getDocs(usersCollectionRef);
        return usersSnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
    }),
    incrementField: (userId, field) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        const userSnapshot = yield getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            const currentValue = data[field] || 0;
            yield updateDoc(userDocRef, { [field]: currentValue + 1 });
        }
    }),
    // we2ft l7d hena
    updateUserField: (userId, field, value) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        yield updateDoc(userDocRef, { [field]: value });
    }),
    updateUserData: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        yield updateDoc(userDocRef, data);
    }),
    uploadProfileImage: (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
        const storageRef = ref(storage, `profile-images/${userId}`);
        try {
            yield deleteObject(storageRef);
        }
        catch (error) {
        }
        const snapshot = yield uploadBytes(storageRef, file);
        const downloadURL = yield getDownloadURL(snapshot.ref);
        yield updateDoc(doc(db, 'users', userId), { photoURL: downloadURL });
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid === userId) {
            yield updateProfile(currentUser, { photoURL: downloadURL });
        }
        return downloadURL;
    }),
    deleteProfileImage: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const storageRef = ref(storage, `profile-images/${userId}`);
        try {
            yield deleteObject(storageRef);
            yield updateDoc(doc(db, 'users', userId), { photoURL: null });
        }
        catch (error) {
            console.error('Error deleting profile image:', error);
        }
    }),
    updateUserStats: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const applicationsQuery = query(collection(db, 'applications'), where('userId', '==', userId));
            const applicationsSnapshot = yield getDocs(applicationsQuery);
            const appliedJobsCount = applicationsSnapshot.docs.length;
            const userDocRef = doc(db, 'users', userId);
            const userSnapshot = yield getDoc(userDocRef);
            if (!userSnapshot.exists())
                return;
            const userData = userSnapshot.data();
            const coursesEnrolledCount = (userData.registeredCourses || []).length;
            yield updateDoc(userDocRef, {
                appliedJobs: appliedJobsCount,
                coursesEnrolled: coursesEnrolledCount,
                cvUploads: appliedJobsCount,
            });
            return {
                appliedJobs: appliedJobsCount,
                coursesEnrolled: coursesEnrolledCount,
                cvUploads: appliedJobsCount,
            };
        }
        catch (error) {
            console.error('Error updating user stats:', error);
            throw error;
        }
    }),
};
export const NotesService = {
    uploadNote: (file, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const storageRef = ref(storage, `notes/${userId}/${file.name}`);
        yield uploadBytes(storageRef, file);
        const fileURL = yield getDownloadURL(storageRef);
        yield addDoc(collection(db, 'notes'), {
            fileName: file.name,
            fileURL,
            userId,
            uploadedAt: serverTimestamp(),
            shared: false,
        });
        yield UserService.incrementField(userId, 'downloads');
        return fileURL;
    }),
};
export const ApplicationsService = {
    updateStatus: (applicationId, nextStatus) => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = doc(db, 'applications', applicationId);
        const snap = yield getDoc(appRef);
        if (!snap.exists())
            return;
        const data = snap.data();
        const history = Array.isArray(data.statusHistory) ? data.statusHistory : [];
        yield updateDoc(appRef, {
            status: nextStatus,
            stage: nextStatus,
            lastUpdatedAt: serverTimestamp(),
            statusHistory: [...history, { status: nextStatus, at: serverTimestamp() }],
        });
        if (data.jobId) {
            yield JobService.updateApplicantsAggregates(String(data.jobId));
        }
    }),
    markViewed: (applicationId) => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = doc(db, 'applications', applicationId);
        const snap = yield getDoc(appRef);
        if (!snap.exists())
            return;
        const data = snap.data();
        yield updateDoc(appRef, { viewed: true, viewedAt: serverTimestamp(), lastUpdatedAt: serverTimestamp() });
        if (data.jobId) {
            yield JobService.updateApplicantsAggregates(String(data.jobId));
        }
    }),
    addNote: (applicationId, note) => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = doc(db, 'applications', applicationId);
        const snap = yield getDoc(appRef);
        if (!snap.exists())
            return;
        const data = snap.data();
        const notes = Array.isArray(data.notes) ? data.notes : [];
        yield updateDoc(appRef, { notes: [...notes, { note, at: serverTimestamp() }], lastUpdatedAt: serverTimestamp() });
    }),
    scoreApplicant: (applicationId, score) => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = doc(db, 'applications', applicationId);
        yield updateDoc(appRef, { score, lastUpdatedAt: serverTimestamp() });
    }),
    getByJob: (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const qApps = query(collection(db, 'applications'), where('jobId', '==', jobId));
        const snap = yield getDocs(qApps);
        return snap.docs.map(d => (Object.assign({ id: d.id }, d.data())));
    }),
    getStats: (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const apps = yield ApplicationsService.getByJob(jobId);
        const byStatus = {};
        const domains = {};
        let viewed = 0;
        const userIds = new Set();
        apps.forEach((a) => {
            const s = a.status || 'pending';
            byStatus[s] = (byStatus[s] || 0) + 1;
            if (a.viewed)
                viewed += 1;
            const d = a.emailDomain;
            if (d)
                domains[d] = (domains[d] || 0) + 1;
            if (a.userId)
                userIds.add(String(a.userId));
            else if (a.email)
                userIds.add(`email:${a.email}`);
        });
        const total = apps.length;
        return { total, byStatus, viewed, domains, uniqueApplicants: userIds.size };
    }),
};
export const JobService = {
    updateApplicantsAggregates: (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const stats = yield ApplicationsService.getStats(jobId);
        const topDomains = Object.entries(stats.domains)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([domain, count]) => ({ domain, count }));
        const jobRef = doc(db, 'jobs', jobId);
        yield updateDoc(jobRef, {
            applicantsCount: stats.total,
            applicantsByStatus: stats.byStatus,
            applicantsViewedCount: stats.viewed,
            topEmailDomains: topDomains,
            uniqueApplicants: stats.uniqueApplicants,
            aggregatesUpdatedAt: serverTimestamp(),
        });
    }),
};
export const CourseService = {
    uploadCourse: (courseData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield UserService.getUserData(userId);
        if (!userData || userData.role !== 'teacher') {
            throw new Error('ليس لديك صلاحية رفع كورسات. يجب أن تكون مُدرّسًا.');
        }
        let thumbnailUrl = null;
        if (courseData.thumbnail && courseData.thumbnail instanceof File) {
            const thumbnailRef = ref(storage, `courses/${userId}/${Date.now()}_${courseData.thumbnail.name}`);
            const snapshot = yield uploadBytes(thumbnailRef, courseData.thumbnail);
            thumbnailUrl = yield getDownloadURL(snapshot.ref);
        }
        const lessons = courseData.courseLinks.map((link, index) => ({
            id: index + 1,
            title: link.title || `Lesson ${index + 1}`,
            duration: '00:00',
            videoUrl: link.url || '',
            completed: false,
            description: `This is ${link.title || `lesson ${index + 1}`}.`,
        }));
        const courseRef = yield addDoc(collection(db, 'courses'), {
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
        yield UserService.incrementField(userId, 'coursesCreated');
        return Object.assign(Object.assign({ id: courseRef.id }, courseData), { thumbnail: thumbnailUrl });
    }),
    getAllCourses: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('🔥 Fetching courses from Firebase...');
            const coursesSnapshot = yield getDocs(collection(db, 'courses'));
            console.log('🔥 Courses snapshot:', coursesSnapshot);
            console.log('🔥 Number of courses found:', coursesSnapshot.docs.length);
            const courses = coursesSnapshot.docs.map((doc) => {
                const data = doc.data();
                console.log('🔥 Course data:', { id: doc.id, title: data.title });
                return Object.assign({ id: doc.id }, data);
            });
            console.log('🔥 All courses:', courses);
            return courses;
        }
        catch (error) {
            console.error('🔥 Error fetching courses from Firebase:', error);
            throw error;
        }
    }),
    getCoursesByTeacher: (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
        const q = query(collection(db, 'courses'), where('teacherId', '==', teacherId));
        const snapshot = yield getDocs(q);
        return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }),
    // ✅ الدالة الجديدة المطلوبة: تعديل الكورس من المدرس اللي رفعه فقط
    updateCourse: (courseId, updatedData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const courseDocRef = doc(db, 'courses', courseId);
        const courseSnapshot = yield getDoc(courseDocRef);
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
            const snapshot = yield uploadBytes(thumbnailRef, updatedData.thumbnail);
            thumbnailUrl = yield getDownloadURL(snapshot.ref);
        }
        let lessonsUpdate = undefined;
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
        const dataToUpdate = Object.assign(Object.assign({}, updatedData), { thumbnail: thumbnailUrl, updatedAt: serverTimestamp() });
        if (lessonsUpdate) {
            dataToUpdate.lessons = lessonsUpdate;
            dataToUpdate.modules = lessonsUpdate.length;
        }
        delete dataToUpdate.teacherId;
        delete dataToUpdate.createdAt;
        delete dataToUpdate.id;
        yield updateDoc(courseDocRef, dataToUpdate);
        return Object.assign({ id: courseId }, dataToUpdate);
    }),
    enrollCourse: (courseId, userId, courseData) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        const userSnapshot = yield getDoc(userDocRef);
        if (!userSnapshot.exists()) {
            throw new Error('User does not exist');
        }
        const userData = userSnapshot.data();
        const registeredCourses = userData.registeredCourses || [];
        const isAlreadyEnrolled = registeredCourses.some((c) => c.id === courseId || c.courseId === courseId);
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
        yield updateDoc(userDocRef, {
            registeredCourses: arrayUnion(courseToAdd),
            coursesEnrolled: (userData.coursesEnrolled || 0) + 1,
        });
        return courseToAdd;
    }),
    getEnrolledCourses: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userDocRef = doc(db, 'users', userId);
        const userSnapshot = yield getDoc(userDocRef);
        if (!userSnapshot.exists()) {
            return [];
        }
        const userData = userSnapshot.data();
        return userData.registeredCourses || [];
    }),
};
////////////////////////////////
//Adding Exercises 
///////////////////////////////
export const ExercisesService = {
    uploadExercises: (exercise, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield UserService.getUserData(userId);
        if (!userData || userData.role !== 'teacher') {
            throw new Error('You do not have permission to upload exercises. You must be a teacher.');
        }
        const exerciseRef = yield addDoc(collection(db, 'exercises'), {
            title: exercise.title,
            difficulty: exercise.difficulty,
            duration: exercise.duration,
            points: exercise.points || 0,
            completed: exercise.completed || false,
            questions: exercise.questions || [],
            teacherId: userId,
            teacherName: userData.displayName ||
                `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
                'Teacher',
            createdAt: serverTimestamp(),
            rating: 0,
            reviews: 0,
            studentsCount: 0,
            progress: 0,
        });
        yield UserService.incrementField(userId, 'exercisesCreated');
        return Object.assign({ id: exerciseRef.id }, exercise);
    }),
    getAllExercises: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('🔥 Fetching exercises from Firebase...');
            const exercisesSnapshot = yield getDocs(collection(db, 'exercises'));
            console.log('🔥 Exercises snapshot:', exercisesSnapshot);
            console.log('🔥 Number of exercises found:', exercisesSnapshot.docs.length);
            const exercises = exercisesSnapshot.docs.map((doc) => {
                const data = doc.data();
                console.log('🔥 exercises data:', { id: doc.id, title: data.title });
                return Object.assign({ id: doc.id }, data);
            });
            console.log('🔥 All exercises:', exercises);
            return exercises;
        }
        catch (error) {
            console.error('🔥 Error fetching exercises from Firebase:', error);
            throw error;
        }
    }),
    getExercisesByTeacher: (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
        const q = query(collection(db, 'exercises'), where('teacherId', '==', teacherId));
        const snapshot = yield getDocs(q);
        return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }),
};
