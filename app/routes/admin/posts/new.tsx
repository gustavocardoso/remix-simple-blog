import { redirect } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import PostForm from '~/features/admin/components/PostForm'

export const action: ActionFunction = async ({
  request
}): Promise<ActionData | Response | void> => {
  const data = Object.fromEntries(await request.formData())
  console.log(data)

  return redirect('/admin/posts')
}

export interface FormFields {
  title: string
  content: string
}

export interface ActionData {
  formValues?: FormFields
}

export default function NewPost() {
  return (
    <>
      <h2>New Post</h2>

      <PostForm />
    </>
  )
}
