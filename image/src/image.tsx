import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import { useNamespace } from '@onionl-ui/utils'
import type { ImageProps } from './image'

export interface ImageComponentProps extends ImageProps {
  children?: ReactNode
  load?: ReactNode
  error?: ReactNode
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  [key: string]: unknown
}

export function Image(props: ImageComponentProps) {
  const {
    src,
    alt,
    fit = 'contain',
    preview = false,
    class: imageClass = 'w-300px h-200px',
    loading = 'eager',
    children,
    load,
    error,
    onLoad,
    ...attrs
  } = props

  const ns = useNamespace('image')
  const container = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const imgViewEl = useRef<HTMLImageElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const [imageSrc, setImageSrc] = useState<string | undefined>()
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const first = useRef({ x: 0, y: 0, width: 0, height: 0 })

  const suppliedSlot = Array.isArray(children) ? children[0] : children
  const loadingSlot = load ?? suppliedSlot
  const errorSlot = error ?? suppliedSlot

  function cleanupObserver() {
    if (observer.current && container.current) {
      observer.current.unobserve(container.current)
      observer.current.disconnect()
      observer.current = null
    }
  }

  function handleError() {
    setLoadError(true)
  }

  function loadImage() {
    if (!src) {
      handleError()
      return
    }
    setIsLoading(true)
    setLoadError(false)
    setImageSrc(src)
  }

  function lazyLoadImageSetup() {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        setImageSrc(src)
        setIsLoading(false)
        if (observer.current && container.current) {
          observer.current.unobserve(container.current)
          observer.current = null
        }
      }
    }, {
      root: null,
      threshold: 0.25,
      rootMargin: '50px',
    })

    if (container.current)
      observer.current.observe(container.current)
  }

  useEffect(() => {
    if (loading === 'lazy') {
      setIsLoading(true)
      setLoadError(false)
      cleanupObserver()
      lazyLoadImageSetup()
    }
    else {
      loadImage()
    }

    return cleanupObserver
  }, [src, loading])

  function handleLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    setIsLoading(false)
    onLoad?.(event)
  }

  function preloadImage(imageUrl: string): Promise<void> {
    return new Promise((resolve) => {
      const img = new window.Image()
      img.src = imageUrl
      img.onload = () => resolve()
    })
  }

  async function previewImage() {
    if (!preview || !imageRef.current)
      return

    const rect = imageRef.current.getBoundingClientRect()
    first.current = { x: rect.x, y: rect.y, width: rect.width, height: rect.height }

    await preloadImage(src!)
    setPreviewVisible(true)
  }

  function onPreviewLoad() {
    if (!imgViewEl.current || !previewVisible)
      return

    const rect = imgViewEl.current.getBoundingClientRect()
    const transX = first.current.x - rect.x
    const transY = first.current.y - rect.y
    const scale = first.current.width / rect.width

    imgViewEl.current.style.transformOrigin = '0 0'
    imgViewEl.current.style.transform = `translate3d(${transX}px, ${transY}px, 0) scale(${scale})`

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!imgViewEl.current)
          return
        imgViewEl.current.style.transition = 'transform 0.3s ease-in-out'
        imgViewEl.current.style.transform = 'translate3d(0, 0, 0) scale(1)'
      })
    })
  }

  function handleClosePreview() {
    if (!imgViewEl.current)
      return

    setIsAnimating(true)
    const rect = imgViewEl.current.getBoundingClientRect()
    const transX = first.current.x - rect.x
    const transY = first.current.y - rect.y
    const scale = first.current.width / rect.width

    requestAnimationFrame(() => {
      if (!imgViewEl.current)
        return
      imgViewEl.current.style.transformOrigin = '0 0'
      imgViewEl.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      imgViewEl.current.style.transform = `translate3d(${transX}px, ${transY}px, 0) scale(${scale})`

      setTimeout(() => {
        setPreviewVisible(false)
        setIsAnimating(false)
      }, 300)
    })
  }

  const { style, ...filteredAttrs } = attrs as ImgHTMLAttributes<HTMLDivElement>

  return (
    <div
      ref={container}
      className="ol-image"
      style={style}
      {...filteredAttrs}
    >
      {loadError
        ? (
            <div className={clsx(imageClass, ns.e('error'))}>
              {errorSlot ?? <span>FAILED</span>}
            </div>
          )
        : (
            <>
              {isLoading && (
                <div className={clsx(imageClass, ns.e('load'))}>
                  {loadingSlot ?? 'Loading...'}
                </div>
              )}
              {imageSrc !== undefined && (
                <img
                  ref={imageRef}
                  className={clsx(`ol-image__fit-${fit}`, imageClass)}
                  src={imageSrc}
                  alt={alt}
                  onClick={previewImage}
                  onLoad={handleLoad}
                  onError={handleError}
                />
              )}
              {previewVisible && (
                <div className={ns.em('preview', 'wrapper')} onClick={handleClosePreview}>
                  <img
                    ref={imgViewEl}
                    className={ns.e('preview')}
                    src={imageSrc}
                    alt={alt}
                    onLoad={onPreviewLoad}
                  />
                </div>
              )}
            </>
          )}
    </div>
  )
}

export default Image
