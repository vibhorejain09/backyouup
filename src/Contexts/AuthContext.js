import React,  {createContext, useContext, useState, useEffect} from "react"
import {getAuth} from "firebase/auth"
import app, {db} from "../Utils/firebase"
import {setDoc, doc} from "@firebase/firestore"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile,sendPasswordResetEmail, onAuthStateChanged } from "@firebase/auth"
export const auth = getAuth(app)
const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    function login (email, password){
        return signInWithEmailAndPassword(auth, email, password)    
    }
    async function signup (name, email, password, phone, address, gender)
    {
        return createUserWithEmailAndPassword(auth, email, password).then(
            async (userCred) => {
                const user = userCred.user
                if(user)
                {
                    await updateProfile(user, {displayName: name} )
                    await setDoc(doc(db, "userData", user.uid), {phone: phone, address: address, gender: gender})
                    console.log(user)
                }
            }
        )
    }
    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }
    function logout(){
        return signOut(auth)
    }
    useEffect(() => {
        const authstate = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return authstate
    }, [])
    const value = {
        currentUser, login, signup, logout,resetPassword
    }    
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    
}