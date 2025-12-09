//to connect with the firebase we use firebase configration that allow access to the tables in the firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCE3uzuGnn5w2tsy0QtOnNcMg8yInchqPw", // api is link btw firebase and our website
    authDomain: "studyhub-studentcareer.firebaseapp.com",
    projectId: "studyhub-studentcareer",
    storageBucket: "studyhub-studentcareer.appspot.com",
    messagingSenderId: "24871667232",
    appId: "1:24871667232:web:6c70150b694c95ad3d5e45",
    measurementId: "G-8F2WTFM5K4"
};
// initialize services that we want to use from fire base
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
