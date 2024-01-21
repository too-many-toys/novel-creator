import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@chakra-ui/react';

export const ShakeText = ({
  text,
  index,
  removeEffect,
}: {
  text: string;
  index: string;
  removeEffect: (index: string) => void;
}) => {
  const [isHover, setIsHover] = useState(false);

  const boxRef = useRef(null);
  const range = 3;

  const effectMouseOver = () => {
    setIsHover(true);
  };

  const cancelEffect = () => {
    removeEffect(index);
    setIsHover(false);
  };

  useEffect(() => {
    const box = boxRef.current;

    const getRandomValue = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    gsap.to(box, {
      x: () => range,
      // y: () => getRandomValue(-range, range),
      duration: 0.1,
      repeat: -1,
      yoyo: false,
      // ease: "power1.inOut"
    });
  }, [isHover]);

  return (
    <span ref={boxRef} style={{ display: 'inline-block' }} onMouseEnter={effectMouseOver}>
      {text}
      {isHover && <Button onClick={cancelEffect}>취소</Button>}
    </span>
  );
};
