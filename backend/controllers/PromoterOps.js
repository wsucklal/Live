import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query} from 'firebase/firestore';
/*
Database operations for manipulating the promoter collection.
*/
export async function getPromoters() {
    try {
        const querySnapshot = await getDocs(collection(db, "Promoter"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "promoterId": doc.id
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
        console.error("Error getting promoters:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single promoter based on promoterId.
export async function getPromoter(promoterId) {
    try {
        const docSnap = await getDoc(doc(db, "Promoter", promoterId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create promoter.
export async function createPromoter(promoter) {
    try {
        let promoterId = null;
        await addDoc(collection(db, "Promoter"), promoter)
            .then(function(docRef){//Get new document id.
                console.log("Created promoter with ID: " + docRef.id);
                promoterId = {"promoterId": docRef.id}
            });

        promoter = {//Create promoter object with new id.
            ...promoter,
            ...promoterId
        }
        return promoter;//Return promoter object.
    } catch (error) {
        console.error("Error creating promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update promoter.
export async function updatePromoter(promoter) {
    try {
        await setDoc(doc(db, "Promoter", promoter.promoterId), promoter);
        console.log("Updated promoter " + promoter.promoterId);
    } catch (error) {
        console.error("Error updating promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get promoter by clubberId
export async function getPromotersByClubberId(clubberId) {
    try {
        const promoterRef = collection(db, "Promoter");
        const q = query(promoterRef, where("clubberId", "==", clubberId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "promoterId": doc.id
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
        console.error("Error getting promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get promoters by venueId
export async function getPromotersByVenueId(venueId) {
    try {
        const promoterRef = collection(db, "Promoter");
        const q = query(promoterRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "promoterId": doc.id
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
        console.error("Error getting promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}