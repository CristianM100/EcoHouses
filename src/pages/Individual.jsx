import PropertyDetail from '../components/PropertyDetail';
import { Link } from "react-router-dom";



export function Individual() {
    return(
        <>
            <header className='flex text-center  z-10 py-10 px-5 text-stone-400'>
            <nav className='container flex justify-between ml-10'>
                <div>
                    <Link 
                        to='/'
                        className='text-green-800 text-2xl font-bold tracking-widest'
                    >
                        EcoHouses
                    </Link>
                </div>

                <ul className='text-black flex items-center gap-30'>
                    <li className='mr-10 text-sm font-medium uppercase tracking-wider'>
                        <Link to='/'>Home</Link>
                    </li>
                    
                </ul>    
            </nav>
        </header>

            <PropertyDetail />
        </>
    )
}

export default Individual;