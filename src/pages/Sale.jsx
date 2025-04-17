import PropertyList from "../components/PropertyList";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default Sale;