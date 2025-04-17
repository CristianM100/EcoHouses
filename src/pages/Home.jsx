import PropertyList from '../components/PropertyList';
import Header from "../components/Header";
import Footer from "../components/Footer";

export function Home() {
    return(
        <>
            <Header />
            <div>this is home page</div>
            <PropertyList filterProperties="all"/>
            <Footer />
        </>
    )
}

export default Home;