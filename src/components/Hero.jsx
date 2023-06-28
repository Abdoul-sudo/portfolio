import { motion } from 'framer-motion';

import { styles } from '../styles';
// import { ComputersCanvas } from './canvas';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { cv } from '../assets';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={` mt-10 sm:mt-24 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-60 violet-gradient" />
        </div>

        <div className="flex max-md:flex-col w-full justify-between md:items-center">
          <div>
            {/* Header -------------------------------------------------------------------------------------------- */}
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className="text-[#915EFF]">Abdoul</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I develop innovative user <br className="sm:block hidden" />
              interfaces and web applications
            </p>

            {/* Social media icons & CV ------------------------------------------------------------------------------- */}
            <div className="flex max-md:flex-col justify-between md:items-center">
              {/* Social media icons */}
              <div className={`${styles.heroSocialIcon} mt-7 flex gap-5 `}>
                <div
                  onClick={() =>
                    window.open('https://www.linkedin.com/in/abdoul-ismael-132a40210/', '_blank')
                  }
                  className=" w-16 h-16 border-1 p-3 rounded-full flex justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe] green-text-gradient "
                >
                  <FaLinkedinIn />
                </div>
                <div
                  onClick={() => window.open('https://github.com/Abdoul-sudo', '_blank')}
                  className=" w-16 h-16 p-3 rounded-full flex justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe] green-text-gradient "
                >
                  <FaGithub />
                </div>
              </div>

              {/* CV download */}
              <div className="mt-7 flex flex-nowrap">
                <a
                  href={cv}
                  download="ISMAEL Abdoul Wahhaab CV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[#dfd9ff] font-medium text-[22px] rounded-full border-2 border-[#915eff] px-[28px] py-[12px] hover:shadow-[0_0_25px_#ef64fe] flex-nowrap`}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Profile -------------------------------------------------------------------------------------------- */}
          <div className="home_profile max-md:w-[250px] max-md:h-[250px] max-md:mt-16"></div>
        </div>
      </div>

      {/* <ComputersCanvas /> */}

      {/* Scroll component */}
      <div className="absolute max-md:hidden sm:bottom-24 !bottom-64 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
