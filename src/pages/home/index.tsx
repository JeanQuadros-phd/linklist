import {Social} from '../../components/Social'

import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'

import { db } from '../../services/firebaseConnection'

import { getDocs, collection, orderBy, query, doc, getDoc } from 'firebase/firestore'

import { useEffect , useState} from 'react';



interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps{
    facebook: string;
    youtube: string;
    instagram: string;
}

export function Home(){


    const [links,setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(()=>{
  
        function LoadLinks(){
            const linksRef = collection(db,"links")
            const queryRef = query(linksRef, orderBy("created", "asc"))
            
            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinkProps[];

                snapshot.forEach((doc)=> {
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
   
        }
        LoadLinks();

    },[])

    useEffect(()=>{
     
        function loadSocialLinks(){ //usamos função dentro do useefect pois é algo assíncrono
            const docRef =doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data !== undefined){
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube
                    })
                }
            })
        }
        loadSocialLinks();

    },[])


    return(
    <div className="flex flex-col w-full py-4 items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-white mt-20 ">Prof. Dr. Jean Quadros</h1>
        <span className="text-gray-300 pt-6">Veja meus links 👇🏻 </span>
    
        <main className="flex flex-col w-11/12 max-w-xl text-center"> 
           
            {links.map((item)=>(
                 <section 
                 style={{ backgroundColor: item.bg}}
                 key={item.id}
                 className="bg-white mb-4 w-full py-2 mt-4 rounded-lg select-none transition-transform hover:scale-105 duration-500 cursor-pointer">
                 <a href={item.url} target='_blank'>
                     <p className="text-base md:text-lg font-bold" style={{color: item.color}}>
                         {item.name}
                     </p>
                 </a>
             </section>
            ))}

            {socialLinks && Object.keys(socialLinks).length>0&& (
                            <footer className="flex justify-center gap-3 my-4">
                            <Social url={socialLinks?.facebook}>
                                <FaFacebook size={35} color="#FFF"/>
                            </Social>
            
                            <Social url={socialLinks?.instagram}>
                                <FaInstagram size={35} color="#FFF"/>
                            </Social>
             
                            <Social url={socialLinks?.youtube}>
                                <FaYoutube size={35} color="#FFF"/>
                            </Social>
             
            
                        </footer>
            )}
        
        </main>

    </div>

    )


}