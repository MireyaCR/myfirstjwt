import React, { useContext, useEffect } from 'react';
import {Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";


export const Private = () => {
    
    const {store} = useContext(Context)
    const navigate = useNavigate();   
    
    useEffect(()=> {
        if (!localStorage.getItem("jwt-token")) {
            navigate('/login');
        }
    },[store.token]);

   


    const handleLogout = () => {  
        localStorage.removeItem("jwt-token");
        navigate('/login');
    };

	return (       
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3 className="card-title text-center">Private</h3>
                        </div>                                   
                        <button  className="btn btn-primary mx-auto my-3" 
                                onClick={handleLogout}>Log out</button>
                                         
                    </div>
                </div>
            </div>
        </div>
     );         
};

