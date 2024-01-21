import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../../TextAnimation.css';

export const BlankText = ({text}: {text: string}) => {
    const spanRef = useRef(null);

    useEffect(() => {
      const spanElement = spanRef.current;
  
      gsap.to(spanElement, { opacity: 0, duration: 1, y: -20, repeat: -1, yoyo: true });
  
      return () => {
        gsap.killTweensOf(spanElement);
      };
    }, []);
  
    return (
      <span ref={spanRef}>
        텍스트
      </span>
    );
}