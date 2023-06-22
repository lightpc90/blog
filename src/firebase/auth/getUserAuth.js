import {app} from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const GetUserAuth =async()=>{
    let isEmailProviderLinked = false
    let isPhoneProviderLinked = false

    // Get the currently signed-in user
    const user = auth.currentUser;

    if (user) {
        // Get the list of authentication providers linked to the user
        const providerData = user.providerData;
        // Check if email provider is linked
        isEmailProviderLinked = providerData.some(
          (provider) => provider.providerId === 'password'
        );
      
        // Check if phone provider is linked
        isPhoneProviderLinked = providerData.some(
          (provider) => provider.providerId === 'phone'
        );
      
        if (isEmailProviderLinked) {
            return {isEmailProviderLinked: true}
        }
      
        if (isPhoneProviderLinked) {
          return {isPhoneProviderLinked: true}
        }
    }
    return {isEmailProviderLinked, isPhoneProviderLinked}
}

export default GetUserAuth

