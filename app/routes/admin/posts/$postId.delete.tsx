import { redirect } from '@remix-run/node'
import { deletePost } from '~/features/admin/Admin.api'

import type { ActionFunction } from '@remix-run/node'
import type { ActionData } from './$postId'

export const action: ActionFunction = async ({ request, params }): Promise<Response> => {
  const { postId } = params

  await deletePost(postId!)

  return redirect('/admin/posts')
}
