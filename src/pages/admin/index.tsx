

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { FormEvent, useState , useEffect} from "react";

import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebaseConnection";

import { addDoc, collection, onSnapshot, query , orderBy , doc , deleteDoc } from "firebase/firestore";


interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}
export function Admin(){
    
    const [nameInput,setNameInput] = useState("")    
    const [urlInput,setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#FFFFF")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#CCCC12")
    
    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(()=>{
        const linksRef = collection(db,"links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot)=>{
        let lista = [] as LinkProps[]; // vou receber uma lista de objetos igual a interface LinkProps

        snapshot.forEach((doc)=>{
            lista.push({
                id: doc.id,
                name: doc.data().name,
                url:doc.data().url,
                bg: doc.data().bg,
                color:doc.data().color
            })
        })
        setLinks(lista);
        
        })

        return ()=>{
            unsub();// desmonta os olheiros, observers quando sair da página
        }


    },[])
     function handleRegister(e:FormEvent){
        e.preventDefault();

        if(nameInput === "" || urlInput === ""){
            alert("Prencha todos os campos");
            return;
        }

        addDoc(collection(db, "links"),{
            name: nameInput,
            url:urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date() // apenas para saber a data de criação
        })
        .then(()=> {
            setNameInput("");
            setUrlInput("");
            console.log("Cadastrado com sucesso!")
        })
        .catch((e)=> {
            console.log("Erro ao cadastrar no banco: ", e)
        })
    }

    async function handleDeleteLink(id: string){

        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)

    }


    return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-0">
         <Header/>

        <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
            <label className="text-white font-medium mb-2 mt-2 mx-2">Nome do link</label>
            <Input
            placeholder="Digite o nome do link, por exemplo: Canal do Youtube"
            value={nameInput}
            onChange={(e)=> setNameInput(e.target.value)}
            />

            <label className="text-white font-medium mb-2 mt-2 mx-2">URL do link</label>
            <Input
            type="url"
            placeholder="Digite a URL do seu link..."
            value={urlInput}
            onChange={(e)=> setUrlInput(e.target.value)}
            />
            <section className="flex my-4 gap-5 justify-around">
                <div className="flex gap-4 items-center">
                <label className="text-white font-medium mb-2 mt-2">Cor do texto</label>
                    <input
                    type="color"
                    value={textColorInput} 
                    onChange={(e)=> setTextColorInput(e.target.value)}
                    className="w-7 h-7 rounded-sm"
                    />
                </div>

                <div className="flex gap-4 items-center">
                <label className="text-white font-medium mb-2 mt-2">Cor do fundo</label>
                    <input
                    type="color"
                    value={backgroundColorInput} 
                    onChange={(e)=> setBackgroundColorInput(e.target.value)}
                    className="w-7 h-7 rounded-sm"
                    />
                </div>

            </section>
              {nameInput !==' ' && (
                  <div className="flex items-center justify-center flex-col mb-9 p-10 border-gray-100/25 border rounded-md mx-2">
                  <label className="text-white font-medium mb-2 mt-2">Pré-visualização:</label>
                  <article
                      className="w-11/12 max-w-lg flex flex-col items-center justify-center rounded py-3 h-10"
                      style={{ marginBottom:8, marginTop:8, backgroundColor: backgroundColorInput}}
                 >
                      <p 
                      className="text-xl font-medium"
                      style={{ color: textColorInput}}>{nameInput}</p>
                  </article>
                  </div>
              )}
                <div className="flex justify-center">
                <button 
                className="bg-indigo-500 h-9 rounded-md text-white font-medium flex justify-center items-center w-7/12 mb-7"
                type="submit"
                >
                    Cadastrar
                </button>
                </div>
        </form>

        <h2 className="text-white text-2xl font-semibold mb-4 ">
            Meus Links:
        </h2>
      {links.map((item)=>(
          <article 
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-lg py-3 h-10 rounded px-4 select-none mb-4"
          style={{backgroundColor: item.bg , color: item.color}}
          >
             <p>{item.name}</p>
                <div>
                    <button
                    className="border border-double p-1 rounded-lg bg-stone-500 hover:scale-110 duration-300"><FiTrash size={18} color="#"
                    onClick={() => handleDeleteLink(item.id)}
                    />
                    
                    </button>
                </div>
           </article>
      ))}

    </div>




    )


}