import React, { useContext,useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Login = () => {

   

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    useEffect(() => {
        const storedEmail = actions.getEmail();
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }, [actions]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(setEmail)
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

    const handleSubmit =  (event) =>{
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
             
            fetch("https://3001-mireyacr-myfirstjwt-e2c775fcj9l.ws-eu94.gitpod.io/api/login", requestOptions)
            .then((response)=>response.json())
            .then((response)=>{
                if (response.status ===200) {                    
                    localStorage.setItem("jwt-token", response.token);                           
                    navigate('/private');
                  
                } else {
                    alert(response.message)
                }    
            }).catch((err)=>{
                console.log(err)
            })

       
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
