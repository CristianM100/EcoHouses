import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rent from './pages/Rent';
import Sale from './pages/Sale';
import Home from './pages/Home';
import Individual from './pages/Individual';
import { PropertyProvider } from './context/PropertyContext';
import PropertyForm from './components/PropertyForm';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';

function App() {
  return (
    <div className=''>
      <Router> 
        <PropertyProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/properties/:id" element={<Individual />} />
            <Route path="/add-property" element={<AddPropertyPage />} />
            <Route path="/edit-property/:id" element={<EditPropertyPage />} />
          </Routes>
        </PropertyProvider>
      </Router>
    </div>
  );
}

export default App;

