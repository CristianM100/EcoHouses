/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import data from "/src/data/db.json";

const PropertyContext = createContext();
export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(data.properties);

  const updateProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
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

  const addProperty = (newProperty) => {
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    const propertyWithId = { id: newId, likes: 0, ...newProperty };
    setProperties(prev => [...prev, propertyWithId]);
  };

  return (
    <PropertyContext.Provider value={{ properties, updateProperty, deleteProperty, likeProperty, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
