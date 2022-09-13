import { deleteDoc, getFirestore, doc } from "firebase/firestore";


const removeFromDB = async (collectionName, documentId) => {

    const db = getFirestore();

    try {
        await deleteDoc(doc(db, collectionName, documentId));
        console.log("Document deleted with ID: ", documentId);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default removeFromDB;
