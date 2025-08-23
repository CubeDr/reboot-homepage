import Image, { ImageProps } from 'next/image';

export default function FittedImage(props: ImageProps) {
  return (
    <div className="relative w-full h-full">
      <Image
        {...props}
        fill={true}
        className={props.className + ' object-cover object-center blur-2xl'} />
      <Image
        {...props}
        fill={true}
        className={props.className + ' object-contain object-center'} />
    </div>
  );
}
