import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Footer,
  Tech,
  Works,
  StarsCanvas,
  Skills,
  Trailer,
  ScaleImage,
} from './components';
import './App.scss';
import { useState } from 'react';

const App = () => {
  const [imgScale, setImgScale] = useState('');
  const setImage = (img) => {
    setImgScale(img);
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {imgScale && <ScaleImage src_data={imgScale} setImage={setImage} />}
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

        <Works setImage={setImage} />
        {/* <Feedbacks /> */}
        <div className="relative z-0 pb-24 lg:pb-32">
          <Contact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
