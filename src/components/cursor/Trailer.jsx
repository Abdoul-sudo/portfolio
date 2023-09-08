import React, { useEffect, useState } from 'react';
import './Trailer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons';

const Trailer = () => {
  const [icon, setIcon] = useState(faStar);

  useEffect(() => {
    const trailer = document.getElementById('trailer');

    const getTrailerClass = (type) => {
      if (type == 'link') {
        setIcon(faLink);
      } else {
        setIcon(faStar);
      }
    };
    const animateTrailer = (e, interacting) => {
      const x = e.clientX - trailer.offsetWidth / 2;
      const y = e.clientY - trailer.offsetHeight / 2;

      const keyframes = {
        // zIndex: interacting ? -1 : 2,
        transform: `translate(${x}px, ${y}px) scale(${
          interacting ? 2.5 : 1
        }) rotate(45deg)`,
        boxShadow: interacting ? '0 0 10px #ef64fe' : '0 0 10px white',
        // backgroundColor: interacting ? 'white' : 'transparent',
        border: interacting ? '1px solid #ef64fe' : '2px solid white',
      };

      trailer.animate(keyframes, {
        duration: 800,
        fill: 'forwards',
      });
    };

    const detectInteractable = (e) => {
      const icon = document.getElementById('trailer-icon');

      const interactable = e.target.closest('.interactable'),
        interacting = interactable !== null;

      animateTrailer(e, interacting);

      trailer.dataset.type = interacting ? interactable.dataset.type : '';

      // if (interacting) {
      //   icon.className = getTrailerClass(interactable.dataset.type);
      // }
    };

    window.addEventListener('mousemove', detectInteractable);

    return () => {
      // Nettoyez l'écouteur d'événements lorsque le composant est démonté.
      window.removeEventListener('mousemove', detectInteractable);
    };
  }, []);

  return (
    <div id="trailer">
      {/* <FontAwesomeIcon icon={icon} id="trailer-icon" /> */}
    </div>
  );
};

export default Trailer;