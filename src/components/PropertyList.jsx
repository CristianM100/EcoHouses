//import properties from '/src/data/db.json'
import data from '/src/data/db.json'
import Property from './Property';
import { usePropertyContext } from "../context/PropertyContext";


function PropertyList({ filterProperties }) {
  const { properties } = usePropertyContext();

  const filteredProperties =
    filterProperties === "all"
      ? properties
      : properties.filter((prev) => prev.type === filterProperties);

  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
        {filteredProperties.map((property) => (
          <Property
            key={property.id}
            id={property.id}
            title={property.title}
            {...property}
            images={property.images.main}
            price={property.price}
            type={property.type}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
