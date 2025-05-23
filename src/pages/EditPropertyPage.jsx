import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropertyForm from "../components/PropertyForm";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";



function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, updateProperty } = usePropertyContext();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const numericId = parseInt(id, 10);
        const localProperty = properties.find(p => p.id === numericId);
        
        if (localProperty) {
          setProperty(localProperty);
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/properties/${id}`);
        if (!response.ok) {
          throw new Error("Property not found");
        }
        const data = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, properties]);
  
  const handleUpdate = async (updatedData) => {
    try {
      const propertyToUpdate = {
        ...updatedData,
        id: property.id, 
      };
      
      console.log("Updating property with ID:", id);
      console.log("Property data:", propertyToUpdate);
      
      const response = await fetch(`http://localhost:3000/properties/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyToUpdate),
      });
      
      console.log("Update response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update error details:", errorData);
        throw new Error(`Failed to update property: ${response.status} ${response.statusText}`);
      }
      
      const updatedProperty = await response.json();
      console.log("Updated property:", updatedProperty);
      
      updateProperty(updatedProperty);
      navigate("/");
    } catch (error) {
      console.error("Error updating property:", error);
      setError(error.message);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <>
      <header className='flex text-center z-10 py-10 px-5 text-stone-400'>
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
      <div className="p-4">
        <PropertyForm 
          initialData={property}
          onSubmit={handleUpdate}
          isEdit={true}
        />
      </div>
    </>
  );
}

export default EditPropertyPage;