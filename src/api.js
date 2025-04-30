
export const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const addPropertyToServer = async (propertyData) => {
    try {
      const response = await fetch('http://localhost:3000/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
  
      if (!response.ok) throw new Error('Failed to add property');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  