// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';  // Import initializeApp to initialize Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Firebase Auth modules
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore modules

// Firebase project configuration (your provided credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCPw3fpYi4V7J5VOnLLWE5smJBQTzu8kpI",
  authDomain: "new-project-be5aa.firebaseapp.com",
  projectId: "new-project-be5aa",
  storageBucket: "new-project-be5aa.firebasestorage.app",
  messagingSenderId: "61841956866",
  appId: "1:61841956866:web:13de541d94f10bfcd1c71b"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Google sign-in function
export const signInWithGooglePopup = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

// Create a user document in Firestore (if it doesn't exist)
export const createUserDocFromAuth = async (user) => {
  // Get reference to the Firestore collection for users
  const userRef = doc(db, 'users', user.uid); 

  try {
    // Set user data in Firestore (if user document doesn't already exist)
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });

    console.log('User document created in Firestore:', user.uid);
  } catch (error) {
    console.error('Error creating user document in Firestore:', error);
  }
};

// Optionally, you can add more Firestore operations here (e.g., for storing other user data)
