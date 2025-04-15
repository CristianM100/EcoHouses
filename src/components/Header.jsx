import { Link } from "react-router-dom";

function Header() {
    
    return (
        <header className='flex text-center z-10 py-10 px-5 text-stone-400'>
            <nav className='container flex items-center justify-between ml-10'>
                <div>
                    <Link 
                        to='/'
                        className='text-green-800 text-2xl font-bold tracking-widest'
                    >
                        EcoHomes
                    </Link>
                </div>

                <ul className='text-black flex items-center gap-30'>
                    <li className='ml-2 text-sm font-medium uppercase tracking-wider'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='ml-4 text-sm font-medium uppercase tracking-wider'>
                        <Link to='/rent'>For rent</Link>
                    </li>
                    <li className='mr-1 text-sm font-medium uppercase tracking-wider'>
                        <Link to='/sale'>For sale</Link>
                    </li>
                    <li>
                        <label htmlFor="inputSearch" className="sr-only">Search</label>
                        <input
                            id="inputSearch"
                            name="inputSearch"
                            type="text"
                            placeholder="Search"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </li>
                </ul>    
            </nav>
        </header>
    )
}

export default Header;














/*
function Header() {
    const [nav, setNav] = useState(false);
    
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            EcoHouses
                        </span>
                    </Link>
                <div className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${
                    nav
                        ? "absolute top-14 left-0 w-full bg-white shadow-md p-4 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none"
                        : "hidden md:flex gap-6"
                    }`}
                >
                <ul className="flex flex-col md:flex-row md:gap-8 gap-0">
                    <li>
                        <Link to="/"
                            className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
                            aria-current="page"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="rent"
                            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            For rent
                        </Link>
                    </li>
                    <li>
                        <Link to="sale"
                            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            For sale
                        </Link>
                    </li>
                    <li>
                        <label htmlFor="inputSearch" className="sr-only">Search</label>
                        <input
                            id="inputSearch"
                            name="inputSearch"
                            type="text"
                            placeholder="Search"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </li>
                </ul>
    
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
*/

