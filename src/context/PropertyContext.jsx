/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchPropertiesFromBackend } from '../http';  
import { updateProperty, deleteProperty, addToFavourites, addPropertyAsync } from '../http'; 


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
        const data = await fetchPropertiesFromBackend();  
        setProperties(data);  
        setLoading(false);     
      } catch (err) {
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
      addToFavourites: (id) => addToFavourites(id, setProperties),
      addProperty: (property) => addPropertyAsync(property, properties, setProperties, setError),
    }}>
      {children}  
    </PropertyContext.Provider>
  );
};

