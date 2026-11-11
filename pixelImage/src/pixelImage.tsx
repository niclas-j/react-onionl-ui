import { useEffect, useRef } from 'react'
import type { PixelImageProps } from './pixelImage'
import { defaultProps, PixelImage } from './pixelImage'

export interface OlPixelImageProps extends PixelImageProps {
  src?: string
  alt?: string
}

function OlPixelImage({
  pixelGap = defaultProps.pixelGap,
  pixelSize = defaultProps.pixelSize,
  width,
  height,
  viewportWidth,
  viewportHeight,
  src,
  alt,
}: OlPixelImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let pixelImageInstance: PixelImage | null = null

    if (imgRef.current) {
      pixelImageInstance = new PixelImage(imgRef, {
        pixelGap,
        pixelSize,
        width,
        height,
        viewportWidth,
        viewportHeight,
      })
      pixelImageInstance.create()
    }

    return () => {
      pixelImageInstance?.destroy()
    }
  }, [pixelGap, pixelSize, width, height, viewportWidth, viewportHeight])

  return (
    <div className="ol-pixel-image">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  )
}

export default OlPixelImage
