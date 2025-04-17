import { useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

function AddPropertyForm() {
  const { addProperty } = usePropertyContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    facilities: "",
    sustainability: "",
    price: "",
    type: "for rent",
    images: { main: "/images/default.jpg", others: [] },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(formData);
    navigate("/"); // or redirect to property list
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Add New Property</h2>

      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border p-2" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border p-2" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />
      <input name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Facilities" className="w-full border p-2" />
      <input name="sustainability" value={formData.sustainability} onChange={handleChange} placeholder="Sustainability Info" className="w-full border p-2" />
      <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2">
        <option value="for rent">For Rent</option>
        <option value="for sale">For Sale</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Property
      </button>
    </form>
  );
}

export default AddPropertyForm;
