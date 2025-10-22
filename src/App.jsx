import { BrowserRouter } from 'react-router-dom';

import { About, Contact, Hero, Navbar, Works, StarsCanvas, Trailer, ScaleImage } from './components';
import Expertise from './components/Expertise';
import Footer from './components/Footer';
import './App.scss';
import { useState } from 'react';

const App = () => {
    const [imgScale, setImgScale] = useState('');
    const setImage = (img) => {
        setImgScale(img);
    };

    return (
        <BrowserRouter>
            <div className='relative z-0 bg-bg-primary overflow-x-hidden'>
                {imgScale && <ScaleImage src_data={imgScale} setImage={setImage} />}
                <Trailer />
                <StarsCanvas />

                <Navbar />
                <Hero />
                <About />
                <Expertise />
                <Works setImage={setImage} />

                <div className='relative z-0 pb-20'>
                    <Contact />
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
