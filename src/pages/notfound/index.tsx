
import { Link } from "react-router-dom"

export function NotFound(){
    return(
        <div className="flex w-full min-h-screen text-white justify-center flex-col items-center">
        <h1 className="font-bold text-6xl mb-2">404</h1>
       
        <h1 className="font-bold text-4xl mb-3">Página não encontrada...</h1>
        <Link 
        className="bg-gray-50/20 p-2 rounded"
        to="/">Retornar para home</Link>
        </div>
    )

}