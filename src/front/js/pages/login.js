import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmailBlur = (event) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          setEmailError("Por favor introduzca un correo electrónico válido");
        } else {
          setEmailError("");
        }
    };

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
    
        if (passwordValue.length < 8 || passwordValue.length > 15) {
          setPasswordError("La contraseña debe tener entre 8 y 15 caracteres.");
        } else {
          setPasswordError("");
        }    
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();    

        if(emailError){
          alert(emailError);
          return;
        }
    
        if(passwordError){
          alert(passwordError);
          return;
        }            

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "email":email,
                "password":password
            }),
        }
        try{          
            const response= await fetch("https://3001-mireyacr-myfirstjwt-e2c775fcj9l.ws-eu93.gitpod.io/api/login", requestOptions)
            if (response.status ===200) {                    
                const data = await response.json();
                localStorage.setItem("jwt-token", data.token); 
                console.log("vamos a la zona privada");              
                navigate('/private');
              
            } else {
                  throw new Error("There has been some error");
            }
        }catch (error) {
            console.error('error', error);
        }
      
    };

	return (       
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card mt-5">
                <div className="card-header">
                    <h3 className="card-title text-center">Login</h3>
                </div>
                <div className="card-body"></div>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group p-3">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        />
                        {emailError && <div className="text-danger ms-2 p-1" style ={{fontSize:'12px'}}>{emailError}</div>}
                    </div>
                    <div className= "form-group p-3">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={handlePasswordChange}
                        />
                        {passwordError && (
                        <div className="text-danger ms-2 p-1" style ={{fontSize:'12px'}}>{passwordError}</div>
                    )}
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-3 my-3">
                        Login
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
     );         
	
};
