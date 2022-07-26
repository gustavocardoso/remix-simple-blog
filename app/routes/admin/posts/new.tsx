import { redirect } from '@remix-run/node'
import { ZodError } from 'zod'
import PostForm from '~/features/admin/components/PostForm'

import type { ActionFunction } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { extractValidationErrors, Validator } from '~/utils'
import { savePost } from '~/features/admin/Admin.api'

export interface FormFields {
  title: string
  content: string
  slug: string
}

export interface ActionData {
  formErrors?: Partial<FormFields>
  formValues?: FormFields
}

export const action: ActionFunction = async ({
  request
}): Promise<ActionData | Response | void> => {
  const input = await request.formData()
  const title = input.get('title') as string
  const slug = title.replaceAll(' ', '-').toLowerCase()
  const content = input.get('content') as string

  const data = { title, content, slug }

  try {
    await savePost(Validator.parse(data))

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

export default function NewPost() {
  const actiondata = useActionData<ActionData>()

  return (
    <>
      <PostForm formValues={actiondata?.formValues} formErrors={actiondata?.formErrors} />
    </>
  )
}
