
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFirestore as getDB } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA8v3b6Nnh68Ph1KwM9r2t08iysaVv7MGE",
  authDomain: "persona-55557.firebaseapp.com",
  projectId: "persona-55557",
  storageBucket: "persona-55557.appspot.com",
  messagingSenderId: "944829447661",
  appId: "1:944829447661:web:fc1357faaf9ebfa23e7be4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const personaDB  = getDB(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);