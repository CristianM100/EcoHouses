/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchPropertiesFromBackend } from '../http';  // Import the fetch function from api.js
import { updateProperty, deleteProperty, addToFavourites, addPropertyAsync } from '../http'; // Import all functions for actions




// Create the PropertyContext to be used across the app
const PropertyContext = createContext();

// Custom hook to use PropertyContext
export const usePropertyContext = () => useContext(PropertyContext);

// The PropertyProvider component that wraps around your app to provide context values
export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);  // State to store the list of properties
  const [loading, setLoading] = useState(true);      // State to indicate loading state
  const [error, setError] = useState(null);          // State to store any errors
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch properties from the backend when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchPropertiesFromBackend();  // Fetch properties using the API function
        setProperties(data);  // Update the properties state with the fetched data
        setLoading(false);     // Set loading to false after the data is fetched
      } catch (err) {
        setError(err.message);  // Set error state in case of failure
        setLoading(false);      // Set loading to false after error
      }
    };

    fetchProperties();  // Call the function to fetch properties when component mounts
  }, []); // Empty dependency array ensures this only runs on initial mount

  // Return the context provider to wrap your app with the necessary data
  return (
    <PropertyContext.Provider value={{
      properties,           // The list of properties
      loading,              // Whether the data is still being fetched
      error,                // Any error that occurred during fetching
      searchQuery,          // The current search query
      setSearchQuery,       // Function to update the search query
      updateProperty: (property) => updateProperty(property, setProperties),
      deleteProperty: (id) => deleteProperty(id, setProperties),
      addToFavourites: (id) => addToFavourites(id, setProperties),
      addProperty: (property) => addPropertyAsync(property, properties, setProperties, setError),
    }}>
      {children}  {/* Render the children components */}
    </PropertyContext.Provider>
  );
};



/*
import { createContext, useContext, useState, useEffect } from "react";


import {
  addPropertyAsync,
  updateProperty,
  deleteProperty,
 // likeProperty,
  addToFavourites
} from '../http'; // Adjust the path as needed

const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{
      properties,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      updateProperty: (property) => updateProperty(property, setProperties),
      deleteProperty: (id) => deleteProperty(id, setProperties),
    //  likeProperty: (id) => likeProperty(id, setProperties),
      addToFavourites: (id) => addToFavourites(id, setProperties),
      addProperty: (property) => addPropertyAsync(property, properties, setProperties, setError),
    }}>
      {children}
    </PropertyContext.Provider>
  );
};



*/


/*
const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In PropertyProvider component
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchProperties = async () => {
      console.log("Starting to fetch properties...");
      try {
        const response = await fetch("http://localhost:3000/properties");
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Keep original ID format from server instead of converting
        setProperties(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Debug the current state
  useEffect(() => {
    console.log("Current properties state:", properties);
    console.log("Current loading state:", loading);
    console.log("Current error state:", error);
  }, [properties, loading, error]);

  const updateProperty = (updatedProperty) => {
    setProperties(prev => 
      prev.map(p => p.id === updatedProperty.id ? updatedProperty : p)
    );
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const likeProperty = (id) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const addProperty = async (newProperty) => {
    try {
      // Use the existing ID format
      let newId;
      if (properties.length > 0) {
        // Get the max ID and maintain its type (string or number)
        const maxId = Math.max(...properties.map(p => 
          typeof p.id === 'string' ? parseInt(p.id, 10) : p.id
        ));
        newId = maxId + 1;
        
        // If original IDs are strings, convert back to string
        if (typeof properties[0].id === 'string') {
          newId = newId.toString();
        }
      } else {
        newId = typeof properties[0]?.id === 'string' ? '1' : 1;
      }

      const propertyWithId = {
        ...newProperty,
        id: newId,
        likes: 0
      };

      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add property");
      }

      const addedProperty = await response.json();
      setProperties(prev => [...prev, addedProperty]);
      return addedProperty;
    } catch (error) {
      console.error("Error adding property:", error);
      setError(error.message);
      throw error;
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      loading,
      error,
      updateProperty,
      deleteProperty,
      likeProperty,
      addProperty,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
*/




