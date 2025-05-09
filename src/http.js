export const fetchPropertiesFromBackend = async () => {
  try {
    const response = await fetch("http://localhost:3000/properties");
    if (!response.ok) throw new Error("Failed to fetch properties");
    const data = await response.json();
    return data; // Return the fetched data
  } catch (err) {
    console.error(err);
    throw new Error(err.message); // Rethrow the error for the caller to handle
  }
};


export const addPropertyAsync = async (newProperty, properties, setProperties, setError) => {
  try {
    const propertyWithId = { ...newProperty}; // No ID assigned manually

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



export const addToFavourites = async (id, setProperties) => {
  setProperties(prev =>
    prev.map(p =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    )
  );
    

  // Find the current favorite status to toggle
  const currentProperty = await fetch(`http://localhost:3000/properties/${id}`);
  const data = await currentProperty.json();
  const updatedFavorite = !data.favorite;

  // Update the favorite in the backend (db.json)
  try {
    await fetch(`http://localhost:3000/properties/${id}`, {
      method: "PATCH", // or PUT if replacing the whole object
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: updatedFavorite }),
    });
  } catch (err) {
    console.error("Failed to update favorite status in backend:", err);
  }
};