import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PropertyList from './components/PropertyList';
//import './App.css';

function App() {
  return (
    <div className=''>
      <Router> 
        <Header />
        {/*<Routes>
          <Route path="/" element={<Hero />} />
        
        </Routes>*/}
        <PropertyList />
        <Footer />
     </Router>
    </div>
  );
}

export default App;

