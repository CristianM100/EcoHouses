import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { LiaAddressBookSolid } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6">
      <div className="container mx-auto flex text-center justify-between gap-6">
        
        <div className="w-1/3">
          <h5 className="text-lg">EcoHouses</h5>
          <p className="mt-2 text-sm text-stone-500">&copy; 2025</p>
          <div className="text-sm text-stone-400">
            Created by Cristian Marinescu
          </div>
        </div>

        <div className="w-3/3">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul>
            <li><Link to="/" className="text-stone-400 hover:text-black">Home</Link></li>
            <li><Link to="/sale" className="text-stone-400 hover:text-black">For sale</Link></li>
            <li><Link to="/rent" className="text-stone-400 hover:text-black">For rent</Link></li>
          </ul>
        </div>

        <div className="w-1/3 flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-2 text-left">Follow Us</h3>
          <ul className="flex gap-4 items-center">
            <li>
              <FontAwesomeIcon icon={faFacebook} size="lg" className="text-stone-400 hover:text-white" />
            </li>
            <li>
              <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-stone-400 hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






