import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { FormEvent, useState } from "react";

import {auth} from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function handleSubmit(e : FormEvent){
    e.preventDefault();

       if(email ==='' || password === ''){
        alert("preencha todos os campos");
        return;
       }

    signInWithEmailAndPassword(auth,email,password)
    .then( ()=>{
       
        navigate("/admin", {replace: true})
    })
    .catch((error)=>{
        console.log("Erro ao fazer o login: ", error)
    });


    }


    return(
    <div className="flex w-full h-screen justify-center items-center flex-col">
        
        <Link to="/">
            <h1 className="mt-11 mb-52 text-white mb-7 font-bold text-7xl">Code
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Insight</span>
            </h1>
        </Link>
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
            <Input
                placeholder="Digite o seu email..."
                type="email"
                value={email}
                onChange={ (e)=> setEmail(e.target.value)}            
            />

            <Input
                placeholder="*****"
                type="password"
                value={password}
                onChange={ (e)=> setPassword(e.target.value)}            
            />
            <button 
            className="h-9 bg-indigo-600 text-white rounded font-medium border-0 text-lg"
            type="submit">
                Acesar
            </button>
          </form>
    </div>

    )


}