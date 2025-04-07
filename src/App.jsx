import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
//import './App.css';

function App() {
  return (
    <Router> 
      <Header />
      {/*<Routes>
        <Route path="/" element={<Hero />} />
        
      </Routes>*/}
      <Hero />
      <Footer />
    </Router>
  );
}

export default App;

/*
Instaleaza tailwindul cap de duda 
cand programul nu isi schimba style ce plm meu ar trebui decat ca i lipseste CSS aka tailwind etc boulee*/