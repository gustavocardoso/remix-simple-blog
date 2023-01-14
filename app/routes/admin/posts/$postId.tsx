/* eslint-disable jsx-a11y/img-redundant-alt */
import { json, redirect } from '@remix-run/node'
import { ZodError } from 'zod'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { extractValidationErrors, Validator } from '~/utils'
import { deletePost, getPost, savePost } from '~/features/admin/Admin.api'
import { getSession, commitSession } from '~/utils/sessions.server'
import { useEffect, useState } from 'react'

import PostForm from '~/features/admin/components/PostForm'
import ImageUploader from '~/features/admin/components/ImageUpload'

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { Post } from '~/features/admin/Admin.types'

export interface FormFields {
  title: string
  content: string
  slug: string
}

export interface LoaderData {
  post: Post
  message?: string
}

export interface ActionData {
  message?: string
  formErrors?: Partial<FormFields>
  formValues?: FormFields
}

export const action: ActionFunction = async ({
  request,
  params
}): Promise<ActionData | Response | void> => {
  const { postId } = params
  const input = await request.formData()
  const title = input.get('title') as string
  const slug = title.replaceAll(' ', '-').toLowerCase()
  const content = input.get('content') as string
  const action = input.get('_action')

  const data = { title, content, slug }

  try {
    if (action === 'add') {
      const session = await getSession(request.headers.get('Cookie'))

      await savePost(Validator.parse(data), postId)
      session.flash('editPostKey', 'Post successfully saved!')

      return redirect(`/admin/posts/${postId}`, {
        headers: {
          'Set-Cookie': await commitSession(session)
        }
      })
    }

    if (action === 'delete') {
      await deletePost(postId!)
      return redirect('/admin/posts')
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        formErrors: extractValidationErrors(error),
        formValues: {
          title,
          content,
          slug
        }
      }
    }

    //@ts-ignore
    throw new Error(error.message)
  }
}

export const loader: LoaderFunction = async ({
  params,
  request
}): Promise<LoaderData | Response> => {
  const { postId } = params
  const session = await getSession(request.headers.get('Cookie'))
  const message = session.get('editPostKey') || null

  const post = await getPost(postId!)

  if (!post) {
    return redirect('.')
  }

  return json(
    { message, post },
    {
      headers: {
        'Set-Cookie': await commitSession(session) //will remove the flash message for you
        // "Set-Cookie": await commitSession(session, { maxAge: SESSION_MAX_AGE }), //re set max age if you previously set a max age for your sessions.
      }
    }
  )
}

export default function EditPost() {
  const { post, message } = useLoaderData<LoaderData>()
  const actiondata = useActionData<ActionData>()
  const [featuredImage, setFeaturedImage] = useState('')
  const [featuredImageMessage, setFeaturedImageMessage] = useState('')

  useEffect(() => {
    if (post.featuredImage) setFeaturedImage(post.featuredImage)
  }, [post.featuredImage])

  const handleFileUpload = async (file: File) => {
    const inputFormData = new FormData()
    inputFormData.append('featured-image', file)

    // If there is an image  already saved, delete it
    if (post.featuredImage || featuredImage) {
      console.log('will remove')
      const deleteFormData = new FormData()
      deleteFormData.append('key', post.featuredImage || featuredImage)
      deleteFormData.append('postId', post.id)

      await fetch('./deletefeaturedimage', {
        method: 'POST',
        body: deleteFormData
      })
    }

    const response = await fetch('./featuredimage', {
      method: 'POST',
      body: inputFormData
    })

    const { imageUrl } = await response.json()

    if (imageUrl) {
      const imageFormData = new FormData()
      imageFormData.append('postId', post.id)
      imageFormData.append('featuredImage', imageUrl)

      setFeaturedImage(imageUrl)

      try {
        const savedImage = await fetch('./savefeaturedimage', {
          method: 'POST',
          body: imageFormData
        })

        if (savedImage.ok) setFeaturedImageMessage('Image saved!')
        // await saveFeaturedImage({ featuredImage: imageUrl }, post.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className='w-full md:grid md:grid-cols-12 gap-x-4'>
        <div className='p-8 bg-gray-200 rounded md:col-span-9 dark:bg-black/30'>
          <PostForm
            post={post}
            formValues={actiondata?.formValues}
            formErrors={actiondata?.formErrors}
            message={message}
          />
        </div>

        <div className='p-8 bg-gray-200 rounded dark:bg-black/30 md:col-span-3'>
          <p className='font-semibold'>Featured Image</p>

          <Form method='post' encType='multipart/form-data'>
            <ImageUploader onChange={handleFileUpload} imageUrl={featuredImage} />
          </Form>

          {featuredImageMessage && (
            <p className='mt-2 font-medium text-green-500'>{featuredImageMessage}</p>
          )}
        </div>
      </div>
    </>
  )
}
