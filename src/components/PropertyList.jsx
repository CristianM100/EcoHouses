//import properties from '/src/data/db.json'
import data from '/src/data/db.json'
import Property from './Property';

function PropertyList() {
    return(
        <div className="py-3 sm:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 m-4">
               {/* {properties.map(property => (*/}
               {data.properties.map(property => (
                    <Property
                        key={property.id}
                        title={property.title}
                        images={property.images.main}
                        price={property.price}
                        type={property.type}
                    />
                ))}
            </div>         
        </div>     
    );
};

export default PropertyList;