import { getDocs, getFirestore, collection } from "firebase/firestore";

const readDB = async (collectionName) => {

    /* eslint-disable */
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    /* eslint-enable */

    const documents = [];

    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        documents.push({ data: doc.data(), id: doc.id });
    });

    return documents;
}

export default readDB;