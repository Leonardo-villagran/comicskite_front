// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7QJWUyC_JMnPgrgBLOcJkxra-1tEkoJo",
  authDomain: "comicskite.firebaseapp.com",
  projectId: "comicskite",
  storageBucket: "comicskite.appspot.com",
  messagingSenderId: "137328220572",
  appId: "1:137328220572:web:259ec1f5fecf83def39059"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);

export async function uploadFileSmall(file){
  const storageRef= ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url =await getDownloadURL(storageRef);
  return url;
}

export async function uploadFileLarge(file){
  const storageRef= ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url =await getDownloadURL(storageRef);
  return url;
}
