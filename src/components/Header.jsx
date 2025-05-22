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
        <div>
          <NavLink to="/" className="text-green-800 text-2xl font-bold tracking-widest">
            EcoHouses
          </NavLink>
        </div>

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
              className="px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 text-sm"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;




