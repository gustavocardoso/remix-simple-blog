import { Form } from '@remix-run/react'
import { useTransition } from '@remix-run/react'

export default function PostForm() {
  const transition = useTransition()
  const loading = transition.state === 'submitting'

  return (
    <>
      <Form method='post'>
        <div className='mb-4'>
          <label className='block mb-2 text-lg font-medium' htmlFor='post-title'>
            Title
          </label>
          <input
            className='block w-full px-4 py-2 text-lg border border-blue-300 rounded focus:shadow-lg disabled:bg-gray-200 disabled:border-gray-500'
            type='text'
            id='post-title'
            name='title'
            disabled={loading}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2 text-lg font-medium' htmlFor='post-body'>
            Content
          </label>
          <textarea
            className='block w-full px-4 py-2 text-lg border border-blue-300 rounded focus:shadow-lg disabled:bg-gray-200 disabled:border-gray-500'
            name='content'
            id='post-body'
            cols={60}
            rows={8}
            disabled={loading}
          ></textarea>
        </div>

        <button type='submit' className='bg-blue-500 btn'>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </Form>
    </>
  )
}
