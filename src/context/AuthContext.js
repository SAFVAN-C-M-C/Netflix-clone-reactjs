import {createContext,useContext,useEffect,useState} from 'react';
import { auth,db } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {doc,onSnapshot,setDoc} from 'firebase/firestore'
const AuthContext=createContext();

export function AuthContextProvider({children }){
    const [user,setUser]=useState({});
    const [savedMovies,setSavedMovies]=useState([])
    function signUp(email,password){
        createUserWithEmailAndPassword(auth,email,password)
        setDoc(doc(db,'user',email),{
            savedShows:[]
        })
    }
    function signIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        });
        return ()=>{
            unsubscribe();
        }
    })

    return (
        <AuthContext.Provider value={{user,signUp,logOut,signIn}}>
            {children }
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}