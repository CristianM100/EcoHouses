/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";



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

/*
const PropertyContext = createContext();
export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      console.log("Starting to fetch properties...");
      try {
        const response = await fetch("http://localhost:3000/properties");
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        console.log("Fetched data:", data);
        const propertiesWithNumericIds = data.map(property => ({
          ...property,
          id: Number(property.id)
        }));
        setProperties(propertiesWithNumericIds);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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
      const newId = properties.length > 0 
        ? Math.max(...properties.map(p => Number(p.id))) + 1 
        : 1;

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
      addProperty
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
*/