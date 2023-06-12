import {app} from "../config";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(app);

export default async function Logout() {
    let result = null,
         error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}