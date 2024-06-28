import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { FormEvent, useEffect, useState } from "react";

import { db } from "../../services/firebaseConnection";
import { setDoc, getDoc, doc } from "firebase/firestore";


export function Networks(){




    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")
    
    useEffect(()=>{
        function loadLinks(){
            const docRef = doc(db,"social","link")
            getDoc(docRef)
            .then((snapshot)=>{
             
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube) // interrogação é pq pode não ter nada no banco e venha vazio
                }
            })
        }

        loadLinks();

    },[])

    function handleRegister(e: FormEvent){
        e.preventDefault();
        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(()=> {
            //setFacebook("");
            //setInstagram("");
            //setYoutube("");

            console.log("Cadastrado com sucesso!")
        })
        .catch((e)=> {
            console.log("Erro ao salvar: ", e)
        })
    }


    return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
        <Header/>
        <h1 className="text-white text-2xl font-medium mt-8 b-4">Minhas redes sociais</h1>
        
        <form className="flex flex-col w-full  max-w-xl"
              onSubmit={handleRegister}
        >
            <label 
            className="text-white font-medium mb-2 mt-2 mx-2"
            >Link do Facebook
            </label>
            <Input
            type="url"
            placeholder="Digite a url do Facebook..."
            value={facebook}
            onChange={(e)=> setFacebook(e.target.value)}
            />

            <label 
            className="text-white font-medium mb-2 mt-2 mx-2"
            >Link do Instagram
            </label>
            <Input
            type="url"
            placeholder="Digite a url do Instagram..."
            value={instagram}
            onChange={(e)=> setInstagram(e.target.value)}
            />

            <label 
            className="text-white font-medium mb-2 mt-2 mx-2"
            >Link do Youtube
            </label>
            <Input
            type="url"
            placeholder="Digite a url do Youtube..."
            value={youtube}
            onChange={(e)=> setYoutube(e.target.value)}
            />
            <div className="flex justify-center">
            <button
             className="bg-indigo-500 h-9 rounded-md text-white font-medium flex justify-center items-center w-7/12 my-7">
            Salvar Links
            </button>
            </div>
        </form>
    </div>
    

    )


}