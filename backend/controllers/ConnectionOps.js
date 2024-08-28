import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query, or} from 'firebase/firestore';
/*
Database operations for manipulating the promoter collection.
*/
export async function getConnections() {
    try {
        const querySnapshot = await getDocs(collection(db, "Connection"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "connectionId": doc.id
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
        console.error("Error getting connections:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single connection based on connectionId.
export async function getConnection(connectionId) {
    try {
        const docSnap = await getDoc(doc(db, "Connection", connectionId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting connection:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create connection.
export async function createConnection(connection) {
    try {
        let connectionId = null;
        await addDoc(collection(db, "Connection"), connection)
            .then(function(docRef){//Get new document id.
                console.log("Created connection with ID: " + docRef.id);
                connectionId = {"connectionId": docRef.id}
            });

        connection = {//Create promoter object with new id.
            ...connection,
            ...connectionId
        }
        return connection;//Return promoter object.
    } catch (error) {
        console.error("Error creating promoter:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update connection.
export async function updateConnection(connection) {
    try {
        await setDoc(doc(db, "Connection", connection.connectionId), connection);
        console.log("Updated connection " + connection.connectionId);
    } catch (error) {
        console.error("Error updating connection:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get connection by clubberId or friendId
export async function getConnectionByClubberId(clubberId) {
    try {
        const connectionRef = collection(db, "Connection");
        const q = query(connectionRef, or(where("clubberId", "==", clubberId), where("friendId", "==", clubberId)));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "connectionId": doc.id
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
        console.error("Error getting connection:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}