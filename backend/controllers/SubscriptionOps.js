import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query} from 'firebase/firestore';
/*
Database operations for manipulating the subscription collection.
*/
export async function getSubscriptions() {
    try {
        const querySnapshot = await getDocs(collection(db, "Subscription"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "subscriptionId": doc.id
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
        console.error("Error getting venues:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single subscription based on subscriptionId
export async function getSubscription(subscriptionId) {
    try {
        const docSnap = await getDoc(doc(db, "Subscription", subscriptionId));

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
//Create subscription
export async function createSubscription(subscription) {
    try {
        let subscriptionId = null;
        await addDoc(collection(db, "Subscription"), subscription)
            .then(function(docRef){//Get new document id.
                console.log("Created subscription with ID: " + docRef.id);
                subscriptionId = {"subscriptionId": docRef.id}
            });

        subscription = {//Create subscription object with new id.
            ...subscription,
            ...subscriptionId
        }
        return subscription;//Return subscription object.
    } catch (error) {
        console.error("Error creating venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update subscription.
export async function updateSubscription(subscription) {
    try {
        await setDoc(doc(db, "Subscription", subscription.subscriptionId), subscription);
        console.log("Updated subscription " + subscription.subscriptionId);
    } catch (error) {
        console.error("Error updating subscription:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get subscription by clubberId
export async function getSubscriptionsByClubberId(clubberId) {
    try {
        const subscriptionRef = collection(db, "Subscription");
        const q = query(subscriptionRef, where("clubberId", "==", clubberId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "subscriptionId": doc.id
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
        console.error("Error getting subscription:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get subscription by venueId
export async function getSubscriptionsByVenueId(venueId) {
    try {
        const subscriptionRef = collection(db, "Subscription");
        const q = query(subscriptionRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "subscriptionId": doc.id
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
        console.error("Error getting subscription:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}