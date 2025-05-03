import PropertyList from "../components/PropertyList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect } from 'react';
import { usePropertyContext } from '../context/PropertyContext';



export function Sale() {
    const { properties, loading, error } = usePropertyContext();
    const { searchQuery } = usePropertyContext(); // Access the global search query
  
    const [sort, setSort] = useState('price-asc');
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 8;
  
    const handleSortChange = (e) => setSort(e.target.value);
  
    // Filter properties by type (Sale properties only) and search query
    const saleProperties = properties.filter((p) => p.type === "for sale");
  
    const filteredProperties = saleProperties.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const sortedProperties = [...filteredProperties].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.title.localeCompare(b.title);
        case 'name-desc': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });
  
    const totalPages = Math.ceil(sortedProperties.length / resultsPerPage);
    const paginatedProperties = sortedProperties.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    );
  
    const goToPreviousPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
  
    const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
  
    useEffect(() => {
      setCurrentPage(1); // Reset to page 1 when search or sort changes
    }, [searchQuery, sort]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <>
        <Header />
        <div className="p-4 mb-5">
          <h1 className="text-3xl md:text-4xl ml-9 mb-6 mt-10 font-bold text-gray-500 transition-colors duration-300 hover:text-green-700">
            Sale Properties
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div className="w-full sm:w-auto sm:flex-1"></div> 
              <div className="w-full sm:w-auto flex justify-end">
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="border p-2 mr-6 rounded-lg w-full sm:w-40 text-sm shadow-sm"
                >
                  <option value="price-asc">Price Low → High</option>
                  <option value="price-desc">Price High → Low</option>
                  <option value="name-asc">Name A → Z</option>
                  <option value="name-desc">Name Z → A</option>
                </select>
              </div>
          </div>
  
          <PropertyList properties={paginatedProperties} />
  
          <div className="flex justify-center mt-6">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 mx-2 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 mx-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  export default Sale;
  













/*
export function Sale() {
    return(
        <>
            <Header />
            <div>this is sale page</div>
            <PropertyList filterProperties="for sale"/>
            <Footer />
        </>
    )
}

export default Sale;*/