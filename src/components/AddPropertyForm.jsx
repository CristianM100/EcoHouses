import { useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";



function AddPropertyForm() {
  const { addProperty } = usePropertyContext();
  const navigate = useNavigate();
  
  // Separate state for previews
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [otherImagePreviews, setOtherImagePreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    facilities: "",
    sustainability: "",
    price: "",
    type: "for rent",
    images: {
      main: null,
      others: []
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImagePreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, main: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageFiles = files.filter(file => file.type.startsWith('image/'));
  
    if (validImageFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: {
          ...prev.images,
          others: [...prev.images.others, ...validImageFiles]
        }
      }));
  
      Promise.all(
        validImageFiles.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        })
      ).then(results => {
        setOtherImagePreviews(prev => [...prev, ...results]);
      });
    }
  };

  const removeOtherImage = (index) => {
    // Remove from both the form data and previews
    setFormData(prev => {
      const updatedOthers = [...prev.images.others];
      updatedOthers.splice(index, 1);
      return {
        ...prev,
        images: {
          ...prev.images,
          others: updatedOthers
        }
      };
    });
    
    setOtherImagePreviews(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(formData);
    navigate("/"); // or redirect to property list
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Add New Property</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          id="title"
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Title" 
          className="w-full border p-2 rounded" 
          required
        />
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input 
          id="location"
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          placeholder="Location" 
          className="w-full border p-2 rounded" 
          required
        />
      </div>
      
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input 
          id="price"
          name="price" 
          type="number" 
          value={formData.price} 
          onChange={handleChange} 
          placeholder="Price" 
          className="w-full border p-2 rounded" 
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          id="description"
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Description" 
          className="w-full border p-2 rounded" 
          rows="4"
        />
      </div>
      
      <div>
        <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
        <input 
          id="facilities"
          name="facilities" 
          value={formData.facilities} 
          onChange={handleChange} 
          placeholder="Facilities (e.g., 3 Beds, 2 Baths, Garage)" 
          className="w-full border p-2 rounded" 
        />
      </div>
      
      <div>
        <label htmlFor="sustainability" className="block text-sm font-medium text-gray-700">Sustainability Info</label>
        <input 
          id="sustainability"
          name="sustainability" 
          value={formData.sustainability} 
          onChange={handleChange} 
          placeholder="Sustainability Info" 
          className="w-full border p-2 rounded" 
        />
      </div>
      
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Property Type</label>
        <select 
          id="type"
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          className="w-full border p-2 rounded"
        >
          <option value="for rent">For Rent</option>
          <option value="for sale">For Sale</option>
        </select>
      </div>
      
      {/* Main Image Input */}
      <div>
        <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">Main Property Image</label>
        <input 
          id="mainImage" 
          type="file" 
          accept="image/*"
          onChange={handleMainImageChange} 
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full text-sm text-gray-500 border p-2 rounded"
          required
        />
        
        {/* Main Image Preview */}
        {mainImagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <img 
              src={mainImagePreview} 
              alt="Main property image preview" 
              className="mt-1 h-40 object-cover rounded"
            />
          </div>
        )}
      </div>
      
      {/* Other Images Input */}
      <div>
        <label htmlFor="otherImages" className="block text-sm font-medium text-gray-700">Additional Property Images</label>
        <input 
          id="otherImages" 
          type="file" 
          accept="image/*"
          onChange={handleOtherImagesChange} 
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full text-sm text-gray-500 border p-2 rounded"
          multiple
        />
        
        {/* Other Images Preview */}
        {otherImagePreviews.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Previews:</p>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {otherImagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img 
                    src={preview} 
                    alt={`Property image preview ${index + 1}`} 
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeOtherImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add Property
      </button>
    </form>
  );
}

export default AddPropertyForm;
