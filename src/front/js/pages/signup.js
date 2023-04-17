import React, {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { actions } = useContext(Context);

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
    } else if (!/\d/.test(passwordValue)) {
      setPasswordError("La contraseña debe contener al menos un número.");
    } else if (!/[a-z]/.test(passwordValue)) {
      setPasswordError("La contraseña debe contener al menos una letra minúscula.");
    } else if (!/[A-Z]/.test(passwordValue)) {
      setPasswordError("La contraseña debe contener al menos una letra mayúscula.");
    } else if (!/[@$!%*?&]/.test(passwordValue)) {
      setPasswordError("La contraseña debe contener al menos un carácter especial (@$!%*?&).");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    

    if(emailError){
      setFormError(emailError);
      return;
    }
  
    if(passwordError){
      setFormError(passwordError);
      return;
    }

    const data = { email, password };
    
    fetch(
      "https://3001-mireyacr-myfirstjwt-e2c775fcj9l.ws-eu94.gitpod.io/api/registro",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {      
        console.log(data)
        if(data.status === 200){ 
          actions.setEmail(email);                
          navigate('/login');       
        }else if(data.status === 400){
          setFormError(data.msg);          
        }
       
      })
      .catch((error) => console.error(error));
  };

  return (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-header">
            <h3 className="card-title text-center">Registro</h3>
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
                 {formError && <div className="text-danger ms-2 p-1" style={{fontSize:'12px'}}>{formError}</div>}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-3 my-3">
                  Registrarse
                </button>
              </div>
            </form>
         </div>
      </div>
    </div>
  </div>
  );
};
