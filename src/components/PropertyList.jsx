import Property from './Property';



function PropertyList({ properties }) {
  if (!properties.length) return <p>No properties found.</p>;

  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-10">
        {properties.map((property) => (
          <Property
            key={property.id}
            id={property.id}
            title={property.title}
            images={property.images}
            location={property.location}
            favorite={property.favorite}
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

