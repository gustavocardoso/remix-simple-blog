import { Form } from '@remix-run/react'
import { useTransition } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { Post } from '../Admin.types'
import { getSession, commitSession } from '~/sessions.server'
import { LoaderFunction } from '@remix-run/node'

interface FormFields {
  title?: string
  content?: string
}

interface PostFormProps {
  message?: string
  formErrors?: FormFields
  formValues?: FormFields
  post?: Post
}

// export const loader: LoaderFunction = async ({ request }): Promise<any> => {
//   const session = await getSession(request.headers.get('Cookie'))
// }

export default function PostForm({ formValues, formErrors, post, message }: PostFormProps) {
  const transition = useTransition()
  const loading = transition.state === 'submitting'

  let titleRef = useRef<HTMLInputElement>(null)
  let messageRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!loading) {
      titleRef.current?.focus()
      messageRef.current?.classList.remove('hidden')
    }

    if (loading) {
      messageRef.current?.classList.add('hidden')
    }
  }, [loading])

  useEffect(() => {
    messageRef.current?.classList.remove('hidden')
  }, [message])

  return (
    <>
      <Form method='post' className='p-8 bg-gray-200 rounded dark:bg-black'>
        {message && (
          <p ref={messageRef} className='text-lg font-semibold text-red-500 transition-all'>
            {message}
          </p>
        )}

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

        {post && (
          <button type='submit' name='_action' value='delete' className='!bg-red-500 btn mr-4'>
            Delete
          </button>
        )}

        <button type='submit' name='_action' value='add' className='!bg-blue-500 btn'>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </Form>
    </>
  )
}
