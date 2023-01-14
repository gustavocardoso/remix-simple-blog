import React, { useRef, useState } from 'react'

interface ImageUploaderProps {
  onChange: (file: File) => any
  imageUrl?: string
}

export default function ImageUploader({ onChange, imageUrl }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef(null)
  const [draggingOver, setDraggingOver] = useState(false)

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      onChange(e.currentTarget.files[0])
    }
  }

  return (
    <>
      <div
        ref={dropRef}
        className={`${
          draggingOver ? 'border border-dashed border-green-500' : 'border border-blue-500'
        } aspect-video cursor-pointer group bg-cover hover:border-dashed hover:border-green-500 rounded`}
        style={{
          ...(imageUrl ? { backgroundImage: `url(${imageUrl})` } : {})
        }}
        onDragEnter={() => setDraggingOver(true)}
        onDragLeave={() => setDraggingOver(false)}
        onDrag={preventDefaults}
        onDragStart={preventDefaults}
        onDragEnd={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        title='Add/change featured image'
        aria-label='Add/change featured image'
      >
        {!imageUrl && (
          <p className='flex items-center justify-center w-full h-full font-semibold text-gray-500 transition-colors bg-gray-900 hover:bg-gray-800 hover:text-gray-300'>
            Click here or drop an image
          </p>
        )}
        <input
          type='file'
          name='featured-image'
          ref={fileInputRef}
          onChange={handleChange}
          className='hidden'
        />
      </div>
    </>
  )
}

export const ErrorBoundary = () => {
  return (
    <>
      <h3>Whoops!!!</h3>
    </>
  )
}

export const CatchBoundary = () => {
  return (
    <>
      <h3>Not Found!!!</h3>
    </>
  )
}
