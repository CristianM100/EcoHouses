import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rent from './pages/Rent';
import Sale from './pages/Sale';
import Home from './pages/Home';
import Individual from './pages/Individual';
import { PropertyProvider } from './context/PropertyContext';
import AddProperty from './pages/AddProperty';

function App() {
  return (
    <div className=''>
      <Router> 
        <PropertyProvider>
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/rent" element={<Rent  />} />
            <Route path="/sale" element={<Sale  />} />
            <Route path="/properties/:id" element={<Individual  />} />
            <Route path="/add-property" element={<AddProperty />} />
          </Routes>
        </PropertyProvider>
     </Router>
    </div>
  );
}

export default App;

