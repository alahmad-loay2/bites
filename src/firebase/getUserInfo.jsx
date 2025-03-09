import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";

const getUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
         auth.onAuthStateChanged(async(user) => {
            if(user){
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setUserInfo(docSnap.data())
            }
        }
            setLoading(false);
         })
        };
        fetchUserInfo();
    }, []);

    return { userInfo, loading };
};

export const logOut = async() => {
    try {
        await auth.signOut()
        window.location.reload();
    }
    catch(err){
        console.log("error")
    }
}

export default getUserInfo;
