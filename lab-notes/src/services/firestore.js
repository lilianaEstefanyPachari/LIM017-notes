import { db } from './firebaseConfig';
import { collection, onSnapshot  } from "firebase/firestore";

const notesCollectionRef = collection(db, "notes");

export const updateData = (setNotes) => {
    onSnapshot(notesCollectionRef, snapshot => {
        console.log(snapshot.docs)
        console.log(setNotes)
        // setNotes(snapshot.docs.map(doc => {
        //     return {
        //         id: doc.id,
        //         viewing: false,
        //         ...doc.data()
        //     }
        // }));
    })
}
