import { db, auth, storage } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query, onSnapshot, updateDoc} from 'firebase/firestore';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from 'firebase/storage'
/*
Database operations for manipulating the clubber collection.
*/
export async function getClubbers() {
    try {
        const querySnapshot = await getDocs(collection(db, "Clubber"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "clubberId": doc.id
        }
        let data = {
            ...docId,
            ...doc.data()
        }
        dataArr.push(data);
        });
        console.log(dataArr);

        return(dataArr);
    } catch (error) {
        console.error("Error getting clubbers:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get clubber
export async function getClubber(clubberId) {
    try {
        const docSnap = await getDoc(doc(db, "Clubber", clubberId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting clubbers:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create clubber.
export async function createClubber(clubber) {
    try {
        let clubberId = null;
        //obtain the user credentials after creating the user 
        const userCredential = await createUserWithEmailAndPassword(auth, clubber.email, clubber.password)
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        
        await setDoc(doc(db, "Clubber", uid), clubber)
            .then(function(docRef){//Get new document id.
                console.log("Created clubber with ID: " + uid);
                clubberId = {"clubberId": uid}
            });
        //get the token after creating the user
        const token = await userCredential.user.getIdToken();

        clubber = {//Create clubber object with new id.
            ...clubber,
            token: token,
            password: undefined,
            ...clubberId
        }
        return clubber;//Return clubber object.
    } catch (error) {
        console.error("Error creating clubber:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}


//Update clubber.
export async function updateClubberWithPhoto(clubber) {
    try {
        const clubberDocRef = doc(db, "Clubber", clubber.clubberId);

        //update everything 
        await setDoc(doc(db, "Clubber", clubber.clubberId), clubber);
        console.log("Updated user " + clubber.clubberId);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function updateClubberWithoutPhoto(clubber) {
    try {
        const clubberDocRef = doc(db, "Clubber", clubber.clubberId);

        //update everything besides photo
        await updateDoc(clubberDocRef, {
          email: clubber.email,
          bio: clubber.bio,
          firstName: clubber.firstName,
          lastName: clubber.lastName
        });
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get clubber by api token
export async function getClubberByToken(token) {
    try {
        const clubberRef = collection(db, "Clubber");
        const q = query(clubberRef, where("token", "==", token));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "clubberId": doc.id
            }
            let data = {
                ...docId,
                ...doc.data()
            }
            dataArr.push(data);
        });
        console.log(dataArr);
    
        return(dataArr);
    } catch (error) {
        console.error("Error getting clubber:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
export async function loginClubber(email, password) {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        const clubber = {//Create clubber object with UID and token.
            token: token,
            uid: uid,
        }
        return clubber;//Return clubber object.
    }
    catch(error){
        console.error("Login failed:", error);
        throw error;
    }
}