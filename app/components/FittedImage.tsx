import Image, { ImageProps } from 'next/image';

export default function FittedImage(props: ImageProps) {
  return (
    <>
      <Image
        {...props}
        fill={true}
        className={props.className + ' object-cover object-center blur-2xl scale-150'} />
      <Image
        {...props}
        fill={true}
        className={props.className + ' object-contain object-center'} />
    </>
  );
}
