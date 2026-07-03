import AutomationCards from "@/components/ui/AutomationCards";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import CTA from "../components/sections/CTA";
import Features from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import Tools from "../components/sections/Tools";

function Home(){
    return (
        <>
            <Navbar/>
            <Hero/>
            <Tools/>
            <Features/>
            <CTA/>
            <Footer/>
        </>
    )
}

export default Home