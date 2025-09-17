'use client'

import Image from 'next/image'
import { useState, ChangeEvent, useRef, useCallback } from 'react'
import { GoTrash } from 'react-icons/go'
import Modal from '../Modal'
import { twMerge } from 'tailwind-merge'
import { TImageUploaderProps } from './types'
import { FaCloudUploadAlt } from 'react-icons/fa'
import Button from '../button'
import { IoTrash } from 'react-icons/io5'
import Cropper from 'react-easy-crop'

export default function ImageUploader({
  name,
  readOnly,
  defaultValue,
  label,
  classNamePreview,
  showEdit = true,
  error,
  onChange,
  onClickTrash,
}: TImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [showChoice, setShowChoice] = useState(false)
  const [fileSizeError, setFileSizeError] = useState<string | null>(null)

  // کراپ
  const [showCropper, setShowCropper] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)

  const MAX_FILE_SIZE = 4.5 * 1024 * 1024 // 4.5 MB

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileSizeError('حجم فایل انتخابی بیش از 4.5 مگابایت است!')
      e.target.value = ''
      return
    }

    setFileSizeError(null) // پاک کردن خطای قبلی

    const imageUrl = URL.createObjectURL(selectedFile)
    setSelectedImage(imageUrl)
    setFile(selectedFile)
    setShowCropper(true)
  }

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new window.Image()
      img.addEventListener('load', () => resolve(img))
      img.addEventListener('error', (err) => reject(err))
      img.src = url
    })

  const getCroppedImage = async () => {
    if (!selectedImage || !croppedAreaPixels) return

    const image = await createImage(selectedImage)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const { width, height, x, y } = croppedAreaPixels

    canvas.width = width
    canvas.height = height

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height)

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg')
    )

    if (!blob) return

    const croppedFile = new File([blob], 'cropped-image.jpg', {
      type: blob.type,
      lastModified: Date.now(),
    })

    const croppedUrl = URL.createObjectURL(croppedFile)
    setImagePreview(croppedUrl)

    onChange?.({ target: { name, value: croppedFile } })
  }

  const handleRemove = () => {
    // پاک کردن فایل لوکال
    if (file || imagePreview) {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
      setFile(null)
      onChange?.({ target: { name, value: '' } })
      if (galleryInputRef.current) galleryInputRef.current.value = ''
      if (cameraInputRef.current) cameraInputRef.current.value = ''
      setFileSizeError(null)
      return
    }

    // فایل سروری → فقط پرنت رو مطلع کن
    if (onClickTrash) {
      onClickTrash()
    }
  }

  return (
    <div className={twMerge('w-50 h-45 mx-auto', classNamePreview)}>
      <div className="relative text-center flex flex-col gap-3 justify-center h-full items-center cursor-pointer rounded-xl">
        {!imagePreview && !defaultValue ? (
          <div
            className={twMerge(
              'flex gap-3 flex-col justify-center items-center w-full h-full shadow-lg shadow-primary-950 bg-primary-900  border p-3 rounded-xl border-dashed',
              error ? 'border-error-300' : 'border-primary-800'
            )}
            onClick={() => setShowChoice(true)}
          >
            <FaCloudUploadAlt size={25} />
            <div className="text-xs font-medium select-none text-gray-500">
              آپلود {`${label ?? 'عکس فروشگاه'}`}
            </div>
          </div>
        ) : (
          <>
            <div className="absolute flex justify-center items-center left-2 top-3 w-8 h-8 bg-primary-800 text-gray-200 hover:bg-accent-400 text-error-300 p-1 rounded-full hover:bg-error-300  z-10 shadow border-gray-100">
              <GoTrash
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleRemove()
                }}
              />
            </div>
            {showEdit && (
              <Button
                type="button"
                label="ویرایش عکس فروشگاه"
                color="mutedOutline"
                rounded="normal"
                onClick={() => setShowChoice(true)}
                className="absolute border-0 bg-primary-800 text-gray-50 py-2 w-11/12 text-sm hover:bg-primary-900 z-10"
              />
            )}
          </>
        )}

        <input
          ref={galleryInputRef}
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          readOnly={readOnly}
          disabled={readOnly}
        />
        <input
          ref={cameraInputRef}
          type="file"
          name={name}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageChange}
          readOnly={readOnly}
          disabled={readOnly}
        />

        {(imagePreview || defaultValue) && (
          <div className="w-full h-full relative overflow-hidden rounded-xl border border-dashed border-gray-300 z-0">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="عکس فروشگاه"
                className="object-contain h-full w-full"
              />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${defaultValue}`}
                alt="عکس فروشگاه"
                width={150}
                height={150}
                className="object-contain h-full w-full"
                unoptimized
              />
            )}
          </div>
        )}
      </div>

      {/* نمایش ارور */}
      {(error || fileSizeError) && (
        <div className="flex justify-start items-center gap-1 text-error-300 my-2 text-xs">
          <IoTrash />
          <p>{fileSizeError ?? error}</p>
        </div>
      )}

      <Modal
        isOpen={showChoice}
        onClose={() => setShowChoice(false)}
        label="انتخاب عکس"
      >
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            label="📂 انتخاب از گالری"
            onClick={() => {
              setShowChoice(false)
              galleryInputRef.current?.click()
            }}
          />
          <Button
            type="button"
            label="📷 گرفتن با دوربین"
            onClick={() => {
              setShowChoice(false)
              cameraInputRef.current?.click()
            }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showCropper}
        onClose={() => setShowCropper(false)}
        label="برش عکس"
      >
        <div className="relative w-full h-64 bg-black">
          {selectedImage && (
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
        <div className="flex justify-between gap-2 mt-3">
          <Button
            type="button"
            label="لغو"
            color="danger"
            onClick={() => setShowCropper(false)}
          />
          <Button
            type="button"
            label="تایید"
            onClick={async () => {
              await getCroppedImage()
              setShowCropper(false)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}
