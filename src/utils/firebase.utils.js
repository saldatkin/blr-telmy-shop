import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
   collection,
   writeBatch, 
   query,
   getDocs
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCBgAPu7b2bQCoLOgRwLRnjOJJ1uCJ9VoQ",
    authDomain: "blr-telmy-shop-db.firebaseapp.com",
    projectId: "blr-telmy-shop-db",
    storageBucket: "blr-telmy-shop-db.appspot.com",
    messagingSenderId: "1017195835968",
    appId: "1:1017195835968:web:2bf91ce0ecfec72e85e5a5"
};
  

const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();


export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}


export const createUserDocumentFromAuth = async(
    userAuth, additionalInfo ={}
) => {
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);


    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.log('error with creating new user', error.message);
        }
    }
    
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);