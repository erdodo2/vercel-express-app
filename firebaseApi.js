const { initializeApp } =require("firebase/app");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const {doc, getDoc, getFirestore}=require("firebase/firestore");
const db = getFirestore(app);
module.exports = {
    getData(collection, docId) {
        return new Promise(async (resolve) => {
            const docRef = doc(db, collection, docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                resolve(docSnap.data());
            } else {
                resolve({"message": "No such document!"});
            }
        })
    },
    setData(collection, docId, data) {
        return new Promise(async (resolve) => {
            const docRef = doc(db, collection, docId);

            await setDoc(docRef, data);

            resolve(true)
        })
    },
    deleteData(collection, docId) {
        return new Promise(async (resolve) => {
            const docRef = doc(db, collection, docId);
            await deleteDoc(docRef);
            resolve(true)
        })
    }
}