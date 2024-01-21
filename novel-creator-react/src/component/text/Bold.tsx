import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@chakra-ui/react';

export const BoldText = ({
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

  const effectMouseOver = () => {
    setIsHover(true);
  };

  const cancelEffect = () => {
    removeEffect(index);
    setIsHover(false);
  };

  return (
    <span ref={boxRef} style={{ display: 'inline-block', fontWeight: 'bold' }} onMouseEnter={effectMouseOver}>
      {text}
      {isHover && <Button onClick={cancelEffect}>취소</Button>}
    </span>
  );
};
