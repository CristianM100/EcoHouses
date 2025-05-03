import { NavLink } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";

function Header() {
  const { searchQuery, setSearchQuery } = usePropertyContext();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
      isActive ? "text-green-600" : "text-black hover:text-green-500"
    }`;

  return (
    <header className="flex text-center z-10 py-6 px-5 text-stone-400 bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <NavLink to="/" className="text-green-800 text-2xl font-bold tracking-widest">
            EcoHomes
          </NavLink>
        </div>

        {/* Navigation */}
        <ul className="flex items-center space-x-6 whitespace-nowrap overflow-x-auto gap-12">
          <li>
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/rent" className={linkClasses}>
              For Rent
            </NavLink>
          </li>
          <li>
            <NavLink to="/sale" className={linkClasses}>
              For Sale
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-property"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm font-medium uppercase tracking-wider"
            >
              + Add Property
            </NavLink>
          </li>
          <li>
            <label htmlFor="inputSearch" className="sr-only">
              Search
            </label>
            <input
              id="inputSearch"
              name="inputSearch"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
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

