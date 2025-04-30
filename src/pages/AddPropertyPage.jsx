import React from "react";
import PropertyForm from "../components/PropertyForm.jsx";
import { Link } from "react-router-dom";


function AddPropertyPage() {
  //return <PropertyForm />;
  return (
    <>
      <header className='flex text-center  z-10 py-10 px-5 text-stone-400'>
        <nav className='container flex justify-between ml-10'>
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
            
          </ul>    
        </nav>
      </header>
      <PropertyForm />
    </>
  )
}

export default AddPropertyPage;






/*
function AddPropertyPage() {
  const { addProperty } = usePropertyContext();
  const navigate = useNavigate();

  const handleAdd = (data) => {
    addProperty(data);
    navigate("/");
  };

  return <PropertyForm onSubmit={handleAdd} />;
}

export default AddPropertyPage;*/
