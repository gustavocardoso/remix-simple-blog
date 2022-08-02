import { redirect } from '@remix-run/node'
import { ZodError } from 'zod'
import PostForm from '~/features/admin/components/PostForm'
import { useLoaderData } from '@remix-run/react'
import { extractValidationErrors, Validator } from '~/utils'
import { getPost, savePost } from '~/features/admin/Admin.api'

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { Post } from '@prisma/client'

export interface FormFields {
  title: string
  content: string
  slug: string
}

export interface LoaderData {
  post: Post
}

export interface ActionData {
  formErrors?: Partial<FormFields>
  formValues?: FormFields
}

export const action: ActionFunction = async ({
  request,
  params
}): Promise<ActionData | Response | void> => {
  const input = await request.formData()
  const title = input.get('title') as string
  const slug = title.replaceAll(' ', '-').toLowerCase()
  const content = input.get('content') as string

  const data = { title, content, slug }

  try {
    await savePost(Validator.parse(data), params.postId)

    return redirect('/admin/posts')
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

export const loader: LoaderFunction = async ({ params }): Promise<LoaderData | Response> => {
  const { postId } = params

  console.log(postId)

  const post = await getPost(postId!)

  if (!post) {
    return redirect('.')
  }

  return { post }
}

export default function NewPost() {
  const { post } = useLoaderData<LoaderData>()
  // const actiondata = useActionData<ActionData>()

  return (
    <>
      <PostForm post={post} />
    </>
  )
}
