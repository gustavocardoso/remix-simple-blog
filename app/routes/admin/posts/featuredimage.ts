import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { uploadFeaturedImage } from '~/utils/s3.server'

export const action: ActionFunction = async ({ request }) => {
  const imageUrl = await uploadFeaturedImage(request)

  return json({ imageUrl })
}
