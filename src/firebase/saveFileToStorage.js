import { storage } from './config'
import { uploadBytes, ref, getDownloadURL} from 'firebase/storage'


const SaveFileToStorage = async(file)=>{
    const storageRef = ref(storage , 'images/' + file.name)
    const fileName = `${Date.now()}-${file.name}`
    const uploadTask = await uploadBytes(storageRef, file)
    console.log('the value returned to uploadTask: ', uploadTask)
    const downloadURL = await getDownloadURL(storageRef)
    console.log('download url: ', downloadURL)
    return {downloadURL, fileName}
}


export default SaveFileToStorage