import { db } from './firebaseConfig';
import { addDoc, collection, onSnapshot, doc, deleteDoc   } from "firebase/firestore";

const notesCollectionRef = collection(db, "notes");

export const updateData = (setNotes) => {
    onSnapshot(notesCollectionRef, snapshot => {
        setNotes(snapshot.docs.map(doc => {
            console.log(doc.data())
            return {
                id: doc.id,
                viewing: false,
                ...doc.data()
            }
        }))
    })
}

// Add a new document with a generated id.
export const setDataInFirestore = async (form) => {
    const docRef = await addDoc(notesCollectionRef, form);
    console.log(docRef.id)
}

export const deleteDocFirestore = async(id) => {
    await deleteDoc(doc(db, "notes", id));
}