import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where } from 'firebase/firestore';

export async function getUser(userId) {
    try {
        const docSnap = await getDoc(doc(db, "Clubber", userId));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting users:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function getUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "id": doc.id
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
        console.error("Error getting users:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function createUser(user) {
    try {
        await addDoc(collection(db, "Users"), {  username: user.username, email: user.email, password: user.password, dob: user.dob, bio: user.bio, profilePicture : user.profilePicture });
        // console.log(`user created succssfully `);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function updateUser(user) {
    try {
        await setDoc(doc(db, "Users", user.userId), { email: user.email, name: user.name, status: "active", type: "user" });
        console.log("Updated user " + user.userId);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}



/* Login method. NOT IN USE NOW.
export async function login(email, password) {
    try {
        const usersRef = collection(db, "Users");
        const docSnap = await getDoc(usersRef, where("email", "==", email), where("password", "==", password));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
*/