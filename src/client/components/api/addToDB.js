import { addDoc, getFirestore, collection } from "firebase/firestore";


const addToDB = async (payload, collectionName) => {

    const db = getFirestore();

    try {
        const docRef = addDoc(collection(db, collectionName), payload);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default addToDB;
