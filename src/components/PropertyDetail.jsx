import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { usePropertyContext } from "../context/PropertyContext";
import { HiLocationMarker, HiHome, HiClipboardList } from 'react-icons/hi';
import { FaEuroSign } from 'react-icons/fa';
import { MdEco } from 'react-icons/md';



function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, deleteProperty, loading, error } = usePropertyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openImage = (src) => {
    setSelectedImage(src);
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
    setSelectedImage('');
  };

  useEffect(() => {
    console.log("Component mounted with ID:", id);
    console.log("Current properties:", properties);
    console.log("Loading state:", loading);
  }, [id, properties, loading]);

  if (loading || !properties || !properties.length) {
    console.log("Waiting for properties to load...");
    return <p>Loading...</p>;
  }
  
  if (error) return <p>Error: {error}</p>;

  const propertyId = id ? id.toString() : null;
  
  const property = propertyId && properties ? 
    properties.find((p) => p && p.id && p.id.toString() === propertyId) : 
    null;

  console.log("Looking for property with ID:", propertyId);
  console.log("Available property IDs:", properties.map(p => p?.id || 'undefined'));
  console.log("Found property:", property);

  if (!property) {
    console.log("Property not found. ID:", propertyId);
    console.log("Available properties:", properties);
    return <p>Property not found</p>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/properties/${propertyId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
      
      deleteProperty(property.id);
      navigate("/");
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
  <div className="p-4 m-6">
    <div className="flex">
      <div className="w-1/2 p-2">
        <img
          src={property.images?.main || '/images/placeholder.png'}
          alt={property.title}
          className="rounded-lg w-full h-auto"
          onClick={() => openImage(property.images?.main || '/images/placeholder.png')}
        />
      </div>
      <div className="w-1/2 p-2 grid grid-cols-2 gap-2">
        {property.images?.others?.map((image, index) => {
          const src = image || '/images/placeholder.png';
          return (
            <img
              key={index}
              src={src}
              alt={`${property.title} - ${index}`}
              className="rounded-lg w-full h-auto"
              onClick={() => openImage(src)}
            />
          );
        })}
      </div>
    </div>

    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={closeImage}
      >
        <img
          src={selectedImage}
          alt="Full size"
          className="max-w-full max-h-full rounded-lg"
        />
      </div>
    )}

    <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="mb-6 p-4 bg-white rounded-md border-l-4 border-green-500 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </div>
      <ul className="space-y-3">
        <li className="flex items-center text-gray-700">
          <HiLocationMarker className="w-5 h-5 text-green-500 mr-2" />
          <span className="font-medium mr-2">Location:</span> {property.location}
        </li>
        <li className="flex items-center text-gray-700">
          <FaEuroSign className="w-5 h-5 text-green-500 mr-2" />
          <span className="font-medium mr-2">Price:</span> €{property.price}
        </li>
        <li className="flex items-center text-gray-700">
          <HiHome className="w-5 h-5 text-green-500 mr-2" />
          <span className="font-medium mr-2">Type:</span> {property.type}
        </li>
        <li className="flex items-center text-gray-700">
          <HiClipboardList className="w-5 h-5 text-green-500 mr-2" />
          <span className="font-medium mr-2">Facilities:</span> {property.facilities}
        </li>
        <li className="flex items-center text-gray-700">
          <MdEco className="w-5 h-5 text-green-500 mr-2" />
          <span className="font-medium mr-2">Sustainability:</span> {property.sustainability}
        </li>
      </ul>
    </div>

    <div className="mt-4 space-x-3">
      <Link
        to={`/edit-property/${property.id}`}
        className="bg-green-500 text-white px-4 py-2 rounded inline-block hover:bg-green-600 transition-colors"
      >
        Update Property
      </Link>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Delete Property
      </button>
    </div>
  </div>
  );
}

export default PropertyDetail;
