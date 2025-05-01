
export const addPropertyAsync = async (newProperty, properties, setProperties, setError) => {
  try {
    const propertyWithId = { ...newProperty, likes: 0 }; // No ID assigned manually

    const response = await fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyWithId),
    });

    if (!response.ok) throw new Error("Failed to add property");

    const addedProperty = await response.json(); // This now has the correct, backend-generated ID
    setProperties(prev => [...prev, addedProperty]);
    return addedProperty;
  } catch (error) {
    console.error("Error adding property:", error);
    setError(error.message);
    throw error;
  }
};


export const updateProperty = (updatedProperty, setProperties) => {
  setProperties(prev => 
    prev.map(p => p.id === updatedProperty.id ? updatedProperty : p)
  );
};



export const deleteProperty = (id, setProperties) => {
  setProperties(prev => prev.filter(p => p.id !== id));
};

export const likeProperty = (id, setProperties) => {
  setProperties(prev =>
    prev.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    )
  );
};

export const toggleFavorite = (id, setProperties) => {
  setProperties(prev =>
    prev.map(p =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    )
  );
};
