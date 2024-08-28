import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query} from 'firebase/firestore';
/*
Database operations for manipulating the clubber venue collection (CV).
*/
export async function getCVs() {
    try {
        const querySnapshot = await getDocs(collection(db, "ClubberVenue"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "clubberVenueId": doc.id
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
        console.error("Error getting Clubber Venues:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single CV based on clubberVenueId.
export async function getCV(clubberVenueId) {
    try {
        const docSnap = await getDoc(doc(db, "ClubberVenue", clubberVenueId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting clubber venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create CV.
export async function createCV(clubberVenue) {
    try {
        let clubberVenueId = null;
        await addDoc(collection(db, "ClubberVenue"), clubberVenue)
            .then(function(docRef){//Get new document id.
                console.log("Created clubber venue with ID: " + docRef.id);
                clubberVenueId = {"clubberVenueId": docRef.id}
            });

        clubberVenue = {//Create CV object with new id.
            ...clubberVenue,
            ...clubberVenueId
        }
        return clubberVenue;//Return CV object.
    } catch (error) {
        console.error("Error creating promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update CV.
export async function updateCV(clubberVenue) {
    try {
        await setDoc(doc(db, "ClubberVenue", clubberVenue.clubberVenueId), clubberVenue);
        console.log("Updated clubberVenue " + clubberVenue.clubberVenueId);
    } catch (error) {
        console.error("Error updating clubberVenue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get CV by clubberId
export async function getCVByClubberId(clubberId) {
    try {
        const cvRef = collection(db, "ClubberVenue");
        const q = query(cvRef, where("clubberId", "==", clubberId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "clubberVenueId": doc.id
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
        console.error("Error getting clubberVenue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get CV by venueId
export async function getCVByVenueId(venueId) {
    try {
        const cvRef = collection(db, "ClubberVenue");
        const q = query(cvRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "clubberVenueId": doc.id
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
        console.error("Error getting clubberVenue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}