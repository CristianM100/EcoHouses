import PropertyList from "../components/PropertyList";
import Header from "../components/Header";
import Footer from "../components/Footer";



export function Rent() {
    return(
        <>
            <Header />
            <div>this is rent page</div>
            <PropertyList filterProperties="for rent"/> 
            <Footer />   
        </>
    )
}

export default Rent;