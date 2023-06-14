import { storageRef } from './config'
import { uploadBytes, getDownloadURL } from 'firebase/storage'


    const SaveFileToStorage = async(file)=>{
        const storage = storageRef()
        const fileName = `${Date.now()}-${file.name}`
        const uploadTask = await uploadBytes(storage. file)
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('download url: ', downloadURL)
        return {downloadURL, fileName}
    }


export default SaveFileToStorage