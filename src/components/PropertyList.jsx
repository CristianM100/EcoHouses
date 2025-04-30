import Property from './Property';
import { usePropertyContext } from "../context/PropertyContext";
import React, { useEffect, useState } from 'react';



function PropertyList({ filterProperties }) {
  const { properties, loading, error } = usePropertyContext();

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error loading properties: {error}</p>;
  if (!properties.length) return <p>No properties found.</p>;

  const filteredProperties =
    filterProperties === "all"
      ? properties
      : properties.filter((p) => p.type === filterProperties);

  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
        {filteredProperties.map((property) => (
          <Property
            key={property.id}
            id={property.id}
            title={property.title}
            images={property.images}
            location={property.location}
            likes={property.likes}
            description={property.description}
            facilities={property.facilities}
            sustainability={property.sustainability}
            price={property.price}
            type={property.type}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;









/*
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

export default PropertyList;*/
