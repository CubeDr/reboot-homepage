'use client';

import { ImageProps } from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import FittedImage from './FittedImage';

interface Props {
  src: ImageProps;
  onFadeEnd: () => void;
}

export default function ImageFadeIn({ src, onFadeEnd }: Props) {
  const [back, setBack] = useState(src);
  const [front, setFront] = useState(src);

  const [isFading, setIsFading] = useState(false);

  const onTransitionEnd = useCallback(() => {
    setBack(front);
    setIsFading(false);
    onFadeEnd();
  }, [front, setBack, setIsFading, onFadeEnd]);

  useEffect(() => {
    setFront(src);
    setIsFading(true);
  }, [front, src]);

  return (
    <>
      <FittedImage
        src={back.src}
        alt={back.alt}
        className='opacity-100'
        priority
      />
      <FittedImage
        src={front.src}
        alt={front.alt}
        onTransitionEnd={onTransitionEnd}
        className={isFading ? 'transition-opacity duration-500 opacity-100' : ' opacity-0'}
      />
    </>
  );
}
