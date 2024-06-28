import {BiLogOut} from 'react-icons/bi'
import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import {auth} from '../../services/firebaseConnection'

export function Header(){



    async function handleLogout(){
        await signOut(auth);
    }

 return(

    <header className='w-full max-w-4xl px-0'>

    <nav className='w-full bg-white h-12 flex items-center justify-between rounded px-3'>
        <div className='flex gap-4 font-medium'>
            <Link to='/'>
            Home
            </Link>

            <Link to='/admin'>
            Meus links
            </Link>
       
            <Link to='/admin/social'>
            Redes Sociais
            </Link>

        </div>

        <button onClick={handleLogout}>
            <BiLogOut size={28} color="#db2629"/>
        </button>
    </nav>
    </header>

 )
    

}