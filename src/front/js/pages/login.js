import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const[email,setEmail]=useState("");
    const[password, setPassword]=useState("");

    const handleClick = () =>{

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

        fetch("https://3001-mireyacr-myfirstjwt-lmb5rbs4lva.ws-eu88.gitpod.io/api/login", requestOptions)
        .then(resp=> {
                if (resp.status ===200) {
                    
                    return resp.json();
                }
                else console.log("There has been some error")
            })
        .then(result => localStorage.setItem("jwt-token", result.token))
        .catch(error => console.log('error', error));
        // const opts={
        //     method: 'POST',
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify({
        //         "email":email,
        //         "password":password
        //     })
        // }
        // fetch('https://3001-mireyacr-myfirstjwt-lmb5rbs4lva.ws-eu88.gitpod.io/api/login',opts)
        // .then(resp=> {
        //     if (resp.status ===200) return resp.json();
        //     else console.log("There has been some error")
        // })
        // .catch(error=>{
        //     console.error("There was an error!",error);
        // })
        // localStorage.setItem("jwt-token", data.token);
    }

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
                
			</div>
			
		</div>
	);
};
