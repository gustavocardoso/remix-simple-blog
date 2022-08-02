import { Form } from '@remix-run/react'
import { useTransition } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { Post } from '../Admin.types'

interface FormFields {
  title?: string
  content?: string
}

interface PostFormProps {
  formErrors?: FormFields
  formValues?: FormFields
  post?: Post
  message?: string
}

export default function PostForm({ formValues, formErrors, post }: PostFormProps) {
  const transition = useTransition()
  const loading = transition.state === 'submitting'

  let titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading) {
      titleRef.current?.focus()
    }
  }, [loading])

  return (
    <>
      <Form method='post' className='p-8 bg-gray-200 rounded dark:bg-black'>
        <div className='mb-4'>
          <label className='block mb-2 text-lg font-medium' htmlFor='post-title'>
            Title
          </label>
          <input
            ref={titleRef}
            className='block w-full px-4 py-2 text-lg text-gray-900 border border-blue-300 rounded appearance-none focus:shadow-lg disabled:bg-gray-200 disabled:border-gray-500 dark:bg-gray-50 accent-blue-500'
            type='text'
            id='post-title'
            name='title'
            defaultValue={formValues?.title ?? post?.title}
            key={formValues?.title ?? post?.title}
            disabled={loading}
          />

          {formErrors?.title ? (
            <p className='m-2 font-medium text-red-500'>{formErrors.title}</p>
          ) : null}
        </div>

        <div className='mb-4'>
          <label className='block mb-2 text-lg font-medium' htmlFor='post-body'>
            Content
          </label>
          <textarea
            className='block w-full px-4 py-2 text-lg text-gray-900 border border-blue-300 rounded appearance-none focus:shadow-lg disabled:bg-gray-200 disabled:border-gray-500 dark:bg-gray-50 accent-blue-500'
            name='content'
            id='post-body'
            cols={60}
            rows={8}
            defaultValue={formValues?.content ?? post?.content}
            key={formValues?.content ?? post?.content}
            disabled={loading}
          ></textarea>
          {formErrors?.content ? (
            <p className='m-2 font-medium text-red-500'>{formErrors.content}</p>
          ) : null}
        </div>

        <div className='flex flex-row'>
          {post && (
            <button
              type='submit'
              name='_action'
              value='delete'
              className='!bg-red-500 btn mr-4 !flex flex-row items-center justify-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
              Delete
            </button>
          )}

          <button
            type='submit'
            name='_action'
            value='add'
            className='!bg-blue-500 btn !flex flex-row items-center justify-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>

      {post && <Form id='delete-post' method='post' action={`delete`}></Form>}
    </>
  )
}
