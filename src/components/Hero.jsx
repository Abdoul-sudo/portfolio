import { motion } from 'framer-motion';

import { styles } from '../styles';
// import { ComputersCanvas } from './canvas';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { cv } from '../assets';

const Hero = () => {
  return (
    <section
      className={`relative w-full sm:max-md:h-[calc(100vh-100px)] lg:h-[calc(100vh-100px)]  max-sm:mb-20 mx-auto mt-10 xl:mt-24 `}
    >
      <div
        className={`  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 lg:h-80 h-60 violet-gradient" />
        </div>

        <div className="flex max-md:flex-col w-full justify-between">
          <div className="md:w-1/2 w-full">
            {/* Header -------------------------------------------------------------------------------------------- */}
            <h1
              className={`${styles.heroHeadText} text-white drop-shadow-[0_0_0.3rem_#ffffff70]`}
            >
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
                    window.open(
                      'https://www.linkedin.com/in/abdoul-ismael-132a40210/',
                      '_blank'
                    )
                  }
                  className="interactable w-16 h-16 border-1 p-3 rounded-full flex justify-center items-center cursor-pointer  green-text-gradient "
                >
                  <FaLinkedinIn />
                </div>
                <div
                  onClick={() =>
                    window.open('https://github.com/Abdoul-sudo', '_blank')
                  }
                  className="interactable w-16 h-16 p-3 rounded-full flex justify-center items-center cursor-pointer green-text-gradient "
                >
                  <FaGithub />
                </div>
              </div>

              {/* CV download */}
              <div className="mt-7 flex flex-nowrap">
                <a
                  href={cv}
                  download="ISMAEL Abdoul Wahhaab CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`interactable text-[#dfd9ff]  font-medium 2xl:text-[22px] xl:text-[20px] text-[14px] rounded-full border-2 border-white px-[28px] py-[12px] shadow-[0_0_7px_#fff] hover:shadow-none whitespace-nowrap  `}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Profile -------------------------------------------------------------------------------------------- */}
          <div className="home_profile max-2xl:w-[280px] max-2xl:h-[280px] max-xl:w-[230px] max-xl:h-[230px] max-lg:w-[200px] max-lg:h-[200px] max-md:w-[180px] max-md:h-[180px] max-md:mt-16"></div>
        </div>
      </div>

      {/* <ComputersCanvas /> */}

      {/* Scroll component */}
      <div className="absolute max-lg:hidden sm:!bottom-24 2xl:!bottom-44 w-full flex justify-center items-center">
        <a href="#about">
          <div className="interactable  w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
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
