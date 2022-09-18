/*
 * OptimizedImage.tsx
 * author: evan kirkiles
 * created on Mon Sep 05 2022
 * 2022 the nobot space,
 */
import { useEffect, useState } from 'react';
import Imgix, { buildURL } from 'react-imgix';

type OptimizedImageProps = {
  src?: string;
  dimensions?: { width: number; height: number };
  className?: string;
  sizes?: string;
};

const OptimizedImage: React.FC<OptimizedImageProps> = function OptimizedImage({
  src,
  className,
  sizes,
}) {
  // initiate lazyload on client side
  const [lazyload, setLazyLoad] = useState<string>('');
  useEffect(() => {
    setLazyLoad('lazyload');
  }, []);

  // low-image source
  const LQIP = buildURL(`https://${process.env.IMGIX}/${src}`, {
    auto: 'format',
    px: 16,
    w: 200,
  });

  // return placeholder if no key
  if (!src) return null;

  return (
    <Imgix
      src={src}
      className={`${lazyload} ${className}`}
      sizes={sizes}
      // width={dimensions?.width}
      // height={dimensions?.height}
      attributeConfig={{
        src: 'data-src',
        srcSet: 'data-srcset',
        sizes: 'data-sizes',
      }}
      htmlAttributes={{
        src: LQIP,
        'data-lowsrc': LQIP,
      }}
    />
  );
};

export default OptimizedImage;
