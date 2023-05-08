import { useEffect, useState } from 'react';
import { Size } from '../interfaces/Size';

// eslint-disable-next-line import/prefer-default-export
export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
    type: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      if (window.innerWidth < 1500)
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'xl',
        });
      if (window.innerWidth < 1200)
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'lg',
        });
      if (window.innerWidth < 992)
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'md',
        });
      if (window.innerWidth < 768)
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'sm',
        });
      if (window.innerWidth < 576)
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'xs',
        });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
