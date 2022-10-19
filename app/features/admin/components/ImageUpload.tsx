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
        className={`${draggingOver ? 'border-4 border-dashed border-yellow-300' : ''}`}
        style={{
          backgroundSize: 'cover',
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
      >
        {imageUrl && (
          <div className='absolute w-full h-full transition duration-300 ease-in-out bg-blue-400 rounded-full opacity-50 group-hover:opacity-0' />
        )}
        {
          <p className='z-10 text-4xl font-extrabold text-gray-200 transition duration-300 ease-in-out cursor-pointer pointer-events-none select-none group-hover:opacity-0'>
            +
          </p>
        }
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
