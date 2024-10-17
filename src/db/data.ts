import { db } from "./config";

//firesase db
import { collection, getDocs,query,limit } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

//get 6 documents from the collection
const getData6 = async () => {
  const querySnapshot = await getDocs(query(collection(db, "plantas"),limit(6)));
  const data = querySnapshot.docs.map((doc) => doc.data());
   return data;
 
};

//getall documents from the collection
export const getAllData = async () => {
  const querySnapshot = await getDocs(collection(db, "plantas"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
 
};

export const getPlant = async (id: string) => {
    const docRef = doc(db, "plantas", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
    }




export default {
    getData6,getAllData,getPlant
};
