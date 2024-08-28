import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query, Timestamp } from 'firebase/firestore';

/*
Database operations for manipulating the booking collection.
*/
export async function getBookings() {
    try {
        const querySnapshot = await getDocs(collection(db, "Booking"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "bookingId": doc.id
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
        console.error("Error getting bookings:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single booking based on bookingId.
export async function getBooking(bookingId) {
    try {
        const docSnap = await getDoc(doc(db, "Booking", bookingId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting booking:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create booking.
export async function createBooking(booking) {

    try {
        let bookingId = null;
        let bookingDate = null;

        await addDoc(collection(db, "Booking"), booking)
            .then(function(docRef){//Get new document id.
                console.log("Created booking with ID: " + docRef.id);
                bookingId = {"bookingId": docRef.id}
                bookingDate = {"bookingDate":Timestamp.fromDate(new Date())}
            });

        booking = {//Create booking object with new id.
            ...booking,
            ...bookingId,
            ...bookingDate
        }
        updateBooking(booking)
        return booking;//Return booking object.
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update booking.
export async function updateBooking(booking) {
    try {
        await setDoc(doc(db, "Booking", booking.bookingId), booking);
        console.log("Updated booking " + booking.bookingId);
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get booking by clubberId
export async function getBookingsByClubberId(clubberId) {
    try {
        const bookingRef = collection(db, "Booking");
        const q = query(bookingRef, where("clubberId", "==", clubberId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "bookingId": doc.id
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
        console.error("Error getting booking:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get bookings by venueId
export async function getBookingsByVenueId(venueId) {
    try {
        const bookingRef = collection(db, "Booking");
        const q = query(bookingRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "bookingId": doc.id
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
        console.error("Error getting booking:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}