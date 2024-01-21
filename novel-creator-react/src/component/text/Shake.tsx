import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ShakeText = ({text, onMouseEnter}: {text: string; onMouseEnter: () => void}) => {
    const boxRef = useRef(null);
    const range = 3;
  
    useEffect(() => {
        const box = boxRef.current;
  
        const getRandomValue = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };
  
        gsap.to(box, {
            x: () => getRandomValue(-range, range),
            // y: () => getRandomValue(-range, range),
            duration: 0.1,
            repeat: -1,
            yoyo: false,
            // ease: "power1.inOut"
        });
    }, []);
  
    return <span ref={boxRef} style={{display: 'inline-block'}} onMouseEnter={onMouseEnter}>{text}</span>;
}