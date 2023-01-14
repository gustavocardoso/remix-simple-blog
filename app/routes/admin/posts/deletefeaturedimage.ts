import type { ActionFunction } from '@remix-run/node'
import S3 from 'aws-sdk/clients/s3'
import { deleteFeaturedImage } from '~/features/admin/Admin.api'

const s3 = new S3({
  region: process.env.SB_BUCKET_REGION,
  accessKeyId: process.env.SB_ACCESS_KEY_ID,
  secretAccessKey: process.env.SB_SECRET_ACCESS_KEY
})

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const imageKey = data.get('key') as string
  const postId = data.get('postId') as string
  const key = imageKey.split('.com/')[1]

  try {
    await s3
      .deleteObject({
        Bucket: process.env.SB_BUCKET_NAME || '',
        Key: key
      })
      .promise()
  } catch (error) {
    console.log(error)
  }

  return await deleteFeaturedImage(postId)
}
