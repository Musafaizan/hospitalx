import './App.css';
import Navbar from './page/home/navbar';
import Hero from './page/home/header';
import Solution from './page/home/solution';
import WhoWeServe from './page/home/who-we';
import Advantages from './page/home/advantages';
import CTA from './page/home/cta';
import TrustSection from './page/home/trust';
import  AccordionItem  from './page/home/faq';
import DemoRequestSection from './page/home/demo';
import Footer from './page/home/footer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <TrustSection/>
      <WhoWeServe />
      <CTA />
      <Advantages />
      <Solution />
      <DemoRequestSection/>
      <AccordionItem/>
      <Footer/>
    </div>
  );
}

export default App;
