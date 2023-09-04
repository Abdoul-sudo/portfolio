import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Skills,
  Trailer,
} from './components';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Trailer />
        <StarsCanvas />
        {/* <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center"> */}
        <Navbar />
        <Hero />
        {/* </div> */}
        <About />
        {/* <Experience /> */}
        {/* <Tech /> */}
        <Skills />
        <Works />
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
