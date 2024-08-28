import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query, arrayUnion, updateDoc} from 'firebase/firestore';
/*
Database operations for manipulating the event collection.
*/
export async function getEvents() {
    try {
        const querySnapshot = await getDocs(collection(db, "Event"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "eventId": doc.id
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
        console.error("Error getting event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single event based on eventId.
export async function getEvent(eventId) {
    try {
        const docSnap = await getDoc(doc(db, "Event", eventId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create event.
export async function createEvent(event) {
    try {
        let eventId = null;
        await addDoc(collection(db, "Event"), event)
            .then(function(docRef){//Get new document id.
                console.log("Created event with ID: " + docRef.id);
                eventId = {"eventId": docRef.id}
            });

        event = {//Create event object with new id.
            ...event,
            ...eventId
        }
        return event;//Return event object.
    } catch (error) {
        console.error("Error creating event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update event.
export async function updateEvent(event) {
    try {
        await setDoc(doc(db, "Event", event.eventId), event);
        console.log("Updated event " + event.eventId);
    } catch (error) {
        console.error("Error updating event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get event by venueId
export async function getEventByVenueId(venueId) {
    try {
        const eventRef = collection(db, "Event");
        const q = query(eventRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "eventId": doc.id
            }
            let data = {
                ...docId,
                ...doc.data()
            }
            dataArr.push(data);
        });
        const currentTime = new Date().getTime();

        //Filter events based on if they are in the past
        const filteredEvents = dataArr.filter((event) => {
            const eventTime = new Date(event.eventdate).getTime();
            return eventTime >= currentTime;
        })
        console.log(filteredEvents);
    
        return(filteredEvents);
    } catch (error) {
        console.error("Error getting event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

//Register a clubber for an event
export async function registerClubberForEvent(eventId, clubberId) {
    try {
        const eventRef = doc(db, "Event", eventId)
        await updateDoc(eventRef, {
            registeredPeople: arrayUnion(clubberId)
        })

        console.log("Registered " + clubberId +  " for event with ID: " + eventId)

    } catch (error) {
        console.error("Error getting event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

//Get event by clubberId
export async function getClubberRegisteredEvents(clubberId) {
    try {
        const eventRef = collection(db, "Event");
        const q = query(eventRef, where("registeredPeople", "array-contains", clubberId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "eventId": doc.id
            }
            let data = {
                ...docId,
                ...doc.data()
            }
            dataArr.push(data);
        });
        const currentTime = new Date().getTime();

        //Filter events based on if they are in the past
        const filteredEvents = dataArr.filter((event) => {
            const eventTime = new Date(event.eventdate).getTime();
            return eventTime >= currentTime;
        })
        console.log(filteredEvents);
    
        return(filteredEvents);
    } catch (error) {
        console.error("Error getting event:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function deregisterClubberFromEvent(eventId, clubberId) {
    try {
        const eventRef = doc(db, "Event", eventId);
        const eventSnap = await getDoc(eventRef)

        const currentClubbersRegistered = eventSnap.data().registeredPeople

        const modifiedClubbers = removeValueFromArray(currentClubbersRegistered, clubberId)

        await updateDoc(eventRef, {
            registeredPeople: modifiedClubbers
        })

        console.log('Clubber deregisted successfully')
    } catch (error) {
        console.error("Error deregistering clubber: ", error)
    }
}

function removeValueFromArray (array, valueToRemove) {
    const index = array.indexOf(valueToRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
}
