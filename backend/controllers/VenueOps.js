import { db, auth } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, orderBy, query, updateDoc, limit as limitFn} from 'firebase/firestore';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

/*
Database operations for manipulating the venue collection.
*/

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km

    console.log(d);

    if (typeof d !== 'number' || isNaN(d))
        return 10000000;
    else
        return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

export async function getVenues() {
    try {
        const querySnapshot = await getDocs(collection(db, "Venue"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "venueId": doc.id
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
//Get a single venue
export async function getVenue(venueId) {
    try {
        const docSnap = await getDoc(doc(db, "Venue", venueId));

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
//Create venue.
export async function createVenue(venue) {
    try {
        let venueId = null;
        const userCredential = await createUserWithEmailAndPassword(auth, venue.email, venue.password)
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        
        await setDoc(doc(db, "Venue", uid), venue)
            .then(function(docRef){//Get new document id.
                console.log("Created venue with ID: " + uid);
                venueId = {"clubberId": uid}
            });
        //get the token after creating the user
        const token = await userCredential.user.getIdToken();

        venue = {//Create clubber object with new id.
            ...venue,
            token: token,
            password: undefined,
            ...venueId
        }
        return venue;//Return clubber object.
    } catch (error) {
        console.error("Error creating clubber:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update venue.
export async function updateVenue(venue) {
    try {
        await setDoc(doc(db, "Venue", venue.venueId), venue);
        console.log("Updated venue " + venue.venueId);
    } catch (error) {
        console.error("Error updating venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function updateVenueRatingsList(venueId, newList) {
    try {
        const venueDocRef = doc(db, "Venue", venueId);
        
        // Update only one field
        await updateDoc(venueDocRef, {
            ratings: newList
        });

        console.log("Updated ratings list for "+  venueId +  "has been updated to" + newList);
    } catch (error) {
        console.error("Error updating venue ratings:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function updateVenueRatingsAvg(venueId,  newAvg) {
    try {
        const venueDocRef = doc(db, "Venue", venueId);
        
        // Update only one field
        await updateDoc(venueDocRef, {
            avgRating: newAvg
        });

        console.log("Updated rating avg for "+  venueId +  "has been updated to" + newAvg);
    } catch (error) {
        console.error("Error updating average ratings for venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}


export async function loginVenue(email, password) {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        const venue = {//Create clubber object with UID and token.
            token: token,
            uid: uid,
        }
        return venue;//Return clubber object.
    }
    catch(error){
        console.error("Login failed:", error);
        throw error;
    }
}
//Gets a fixed number of venues by proximity to the users coordinates.
export async function getVenuesFeed(limit, usrLat, usrLon) {
    try {
        const querySnapshot = await getDocs(collection(db, "Venue"));
        
        let dataArr = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let docId = {
                "venueId": doc.id
            };
            let data = {
                ...docId,
                ...doc.data()
            };
            dataArr.push(data);
        });

        // Calculate distance from user for each venue and add it to the data
        dataArr = dataArr.map(venue => ({
            ...venue,
            distance: getDistance(usrLat, usrLon, venue.lat, venue.lon)
        }));

        // Sort venues by distance from user
        dataArr.sort((a, b) => a.distance - b.distance);

        // Limit to the top 10 closest venues
        dataArr = dataArr.slice(0, limit);

        return dataArr;
    } catch (error) {
        console.error("Error getting venues:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}