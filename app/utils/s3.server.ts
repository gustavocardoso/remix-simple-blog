import {
  type UploadHandler,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  unstable_composeUploadHandlers
} from '@remix-run/node'
import S3 from 'aws-sdk/clients/s3'
import cuid from 'cuid'

const s3 = new S3({
  region: process.env.SB_BUCKET_REGION,
  accessKeyId: process.env.SB_ACCESS_KEY_ID,
  secretAccessKey: process.env.SB_SECRET_ACCESS_KEY
})

const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
  async ({ name, filename, data, contentType }) => {
    if (name !== 'featured-image') {
      return
    }

    // @ts-ignore
    const file = await data.next()

    const { Location } = await s3
      .upload({
        Bucket: process.env.SB_BUCKET_NAME || '',
        Key: `${cuid()}.${filename?.split('.').slice(-1)}`,
        Body: Buffer.from(file.value),
        ContentType: contentType
      })
      .promise()

    console.log(Location)

    return Location
  }
)

export const fileUploadHandler = unstable_createFileUploadHandler({
  directory: './public/uploads',
  file: ({ filename }) => filename
})

export async function uploadFeaturedImage(request: Request) {
  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  const file = formData.get('featured-image')?.toString() || ''

  return file
}
