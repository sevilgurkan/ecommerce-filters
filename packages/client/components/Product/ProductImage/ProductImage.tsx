'use client'
import Image, { ImageProps } from 'next/image'

export function ProductImage({ src, alt, ...props }: ImageProps) {
  return <Image src={src || '/undraw_no_image.png'} alt={alt} {...props} />
}
