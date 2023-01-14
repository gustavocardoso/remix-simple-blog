import type { ActionFunction } from '@remix-run/node'
import { saveFeaturedImage } from '~/features/admin/Admin.api'

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const postId = data.get('postId') as string
  const featuredImage = data.get('featuredImage')

  return await saveFeaturedImage({ featuredImage }, postId)
}
