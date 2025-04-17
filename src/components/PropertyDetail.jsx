import { useParams, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";


function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { properties, likeProperty, deleteProperty } = usePropertyContext();
  
    const property = properties.find((p) => p.id === parseInt(id));
  
    if (!property) return <div>Property not found</div>;
  
    const handleLike = () => {
      likeProperty(property.id);
    };
  
    const handleDelete = () => {
      deleteProperty(property.id);
      navigate("/"); // go back to home or list page after delete
    };
  
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <img src={property.images.main} alt={property.title} className="rounded-lg w-full max-w-xl" />
        <p className="mt-2 text-gray-700">{property.description}</p>
  
        <div className="mt-4 space-x-3">
          <button onClick={handleLike} className="bg-green-500 text-white px-4 py-2 rounded">
            👍 Like ({property.likes})
          </button>
  
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            🗑️ Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default PropertyDetail;