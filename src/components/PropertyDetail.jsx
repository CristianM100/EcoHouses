import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { usePropertyContext } from "../context/PropertyContext";





function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, deleteProperty, loading, error } = usePropertyContext();

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

  // Safe ID handling - make sure id exists before using toString()
  const propertyId = id ? id.toString() : null;
  
  // Defensive check for properties array before using find
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
      // Delete from the server
      const response = await fetch(`http://localhost:3000/properties/${propertyId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
      
      // Update local state - make sure to use the correct ID format
      deleteProperty(property.id);
      navigate("/");
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <img
        src={property.images?.main || '/images/placeholder.png'}
        alt={property.title}
        className="rounded-lg w-full max-w-xl"
      />
      <p className="mt-2 text-gray-700">{property.description}</p>
      <p className="mt-2 text-gray-700"><strong>Location:</strong> {property.location}</p>
      <p className="mt-2 text-gray-700"><strong>Price:</strong> ${property.price}</p>
      <p className="mt-2 text-gray-700"><strong>Type:</strong> {property.type}</p>
      <p className="mt-2 text-gray-700"><strong>Facilities:</strong> {property.facilities}</p>
      <p className="mt-2 text-gray-700"><strong>Sustainability:</strong> {property.sustainability}</p>
      
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














/*
function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, deleteProperty, loading, error } = usePropertyContext();

  useEffect(() => {
    console.log("Component mounted with ID:", id);
    console.log("Current properties:", properties);
    console.log("Loading state:", loading);
  }, [id, properties, loading]);

  if (loading || !properties.length) {
    console.log("Waiting for properties to load...");
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error}</p>;

  // Convert id to string for comparison since db.json uses string IDs
  const propertyId = id.toString();
  const property = properties.find((p) => p.id.toString() === propertyId);

  console.log("Looking for property with ID:", propertyId);
  console.log("Available property IDs:", properties.map(p => p.id));
  console.log("Found property:", property);

  if (!property) {
    console.log("Property not found. ID:", propertyId);
    console.log("Available properties:", properties);
    return <p>Property not found</p>;
  }

  const handleDelete = async () => {
    try {
      // Delete from the server
      const response = await fetch(`http://localhost:3000/properties/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
      
      // Update local state
      deleteProperty(id);
      navigate("/");
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <img
        src={property.images?.main || '/images/placeholder.png'}
        alt={property.title}
        className="rounded-lg w-full max-w-xl"
      />
      <p className="mt-2 text-gray-700">{property.description}</p>
      <p className="mt-2 text-gray-700"><strong>Location:</strong> {property.location}</p>
      <p className="mt-2 text-gray-700"><strong>Price:</strong> ${property.price}</p>
      <p className="mt-2 text-gray-700"><strong>Type:</strong> {property.type}</p>
      <p className="mt-2 text-gray-700"><strong>Facilities:</strong> {property.facilities}</p>
      <p className="mt-2 text-gray-700"><strong>Sustainability:</strong> {property.sustainability}</p>

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
*/