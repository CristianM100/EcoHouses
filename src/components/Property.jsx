import { Link } from 'react-router-dom';
import { usePropertyContext } from '../context/PropertyContext'; 



function Property({ id, title, images, location, favorite, facilities, price, type }) {
  
  const { addToFavourites } = usePropertyContext();

  return (
    <Link to={`/properties/${id}`} className="border border-gray-400 rounded-lg p-3">
      <div className="border border-gray-400 rounded-lg p-3">
        <div className="relative">
          <div className="grad absolute w-full h-full rounded-b-[1.3rem]"></div>
          <div className="flex">
            <img
              src={images?.main || '/images/placeholder.png'}
              alt={title}
              className="object-cover rounded-[1.3rem] sm:h-[17rem] md:h-[13rem] w-full"
            />
            <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2">
              {title}
            </div>
          </div>
        </div>

        <div className="pt-3 flex justify-between items-start">
          <div>
            <p className="max-w-[17rem] font-semibold text-[17px]">{location}</p>
            <p className="max-w-[17rem] text-[16px] -mt-1 text-gray-500">{facilities}</p>
            <p className="max-w-[17rem] font-semibold text-[17px]">€{price}</p>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation(); 
                addToFavourites(id);
              }}
              className="text-2xl text-yellow-500 hover:scale-110 transition"
            >
              {favorite ? "💚" : "🤍"}
            </button>
            <p className="text-[15px] rounded p-1 bg-gray-300">{type}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Property;
