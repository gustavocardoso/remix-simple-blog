import { json, redirect } from '@remix-run/node'
import { ZodError } from 'zod'
import PostForm from '~/features/admin/components/PostForm'
import { useActionData, useLoaderData } from '@remix-run/react'
import { extractValidationErrors, Validator } from '~/utils'
import { deletePost, getPost, savePost } from '~/features/admin/Admin.api'
import { getSession, commitSession } from '~/sessions.server'

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { Post } from '@prisma/client'

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

export default function NewPost() {
  const { post, message } = useLoaderData<LoaderData>()
  const actiondata = useActionData<ActionData>()

  console.log(message)

  return (
    <>
      <PostForm
        post={post}
        formValues={actiondata?.formValues}
        formErrors={actiondata?.formErrors}
        message={message}
      />
    </>
  )
}
