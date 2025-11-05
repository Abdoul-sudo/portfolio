import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Hero, Navbar, Footer, Works, StarsCanvas, Skills, ScaleImage } from './components';
import './App.scss';
import { useState } from 'react';

const App = () => {
    const [imgScale, setImgScale] = useState('');
    const setImage = (img) => {
        setImgScale(img);
    };

    return (
        <BrowserRouter>
            <div className='relative z-0 bg-dark overflow-x-hidden'>
                {imgScale && <ScaleImage src_data={imgScale} setImage={setImage} />}
                <StarsCanvas />

                <div className='relative z-10'>
                    <Navbar />
                    <Hero />
                    <About />
                    <Skills />
                    <Works setImage={setImage} />
                    <div className='pb-24 lg:pb-32'>
                        <Contact />
                    </div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
