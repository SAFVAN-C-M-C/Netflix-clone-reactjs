import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
const ProtectedRoute = ({children,auth}) => {
    const {user}=UserAuth();
    if(auth){
        if(user){
            return <Navigate to='/'/>
        }else{
            return children
        }
    }else{
        if(!user){
            return <Navigate to='/'/>
        }else{
            return children
        }
    }
  
}

export default ProtectedRoute