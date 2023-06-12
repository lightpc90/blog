import { firebase_db} from "../config";
import { collection, getDocs } from "firebase/firestore";

const db = firebase_db
export default async function getUsers() {
    let docRef = collection(db, 'users');

    let result = null;
    let error = null;

    try {
        result = await getDocs(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
