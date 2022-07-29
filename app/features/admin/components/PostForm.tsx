import { Form } from '@remix-run/react'
import { useTransition } from '@remix-run/react'
import type { Post } from '../Admin.types'

interface FormFields {
  title?: string
  content?: string
}

interface PostFormProps {
  formErrors?: FormFields
  formValues?: FormFields
  post?: Post
}

export default function PostForm({ formValues, formErrors, post }: PostFormProps) {
  const transition = useTransition()
  const loading = transition.state === 'submitting'

  return (
    <>
      <Form method='post' className='p-8 bg-gray-200 rounded dark:bg-black'>
        <div className='mb-4'>
          <label className='block mb-2 text-lg font-medium' htmlFor='post-title'>
            Title
          </label>
          <input
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

        {post && (
          <button type='submit' form='delete-post' className='!bg-red-500 btn mr-4'>
            Delete
          </button>
        )}

        <button type='submit' className='!bg-blue-500 btn'>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </Form>

      {post && <Form id='delete-post' method='post' action={`delete`}></Form>}
    </>
  )
}
