import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {

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

  const handleSubmit = (event) => {
    event.preventDefault();    

    if(emailError){
      alert(emailError);
      return;
    }

    if(passwordError){
      alert(passwordError);
      return;
    }

    const data = { email, password };
    
    fetch(
      "https://3001-mireyacr-myfirstjwt-e2c775fcj9l.ws-eu92.gitpod.io/api/registro",
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
           navigate("/login")
        }else{
          alert(data.msg)
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
