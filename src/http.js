
export const fetchPropertiesFromBackend = async () => {
  try {
    const response = await fetch("http://localhost:3000/properties");
    if (!response.ok) throw new Error("Failed to fetch properties");
    const data = await response.json();
    return data; 
  } catch (err) {
    console.error(err);
    throw new Error(err.message); 
  }
};


export const addPropertyAsync = async (newProperty, properties, setProperties, setError) => {
  try {
    const propertyWithId = { ...newProperty}; 

    const response = await fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyWithId),
    });

    if (!response.ok) throw new Error("Failed to add property");

    const addedProperty = await response.json(); 
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


export const addToFavourites = async (id, setProperties) => {
  setProperties(prev =>
    prev.map(p =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    )
  );
    
  const currentProperty = await fetch(`http://localhost:3000/properties/${id}`);
  const data = await currentProperty.json();
  const updatedFavorite = !data.favorite;

  try {
    await fetch(`http://localhost:3000/properties/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: updatedFavorite }),
    });
  } catch (err) {
    console.error("Failed to update favorite status in backend:", err);
  }
};