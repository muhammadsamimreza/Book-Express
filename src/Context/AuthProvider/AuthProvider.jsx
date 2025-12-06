import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';


const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {

 const registerUser = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password)  
 }
 const signinUser = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)  
 }
 const signInWithGoogle = () =>{
       return signInWithPopup(auth, googleProvider)
 }
    const authInfo = {
        registerUser,
        signinUser,
        signInWithGoogle
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;