import { FileUpload } from 'graphql-upload'
import sharp from 'sharp'

const getBlurHash = async (image: { file: FileUpload }) => {
  const blur = sharp().webp().blur().resize(15, 15, { fit: 'contain' })
  const stream = image.file.createReadStream()

  const res = await stream.pipe(blur).toBuffer()
  return res.toString('base64')
}

export default getBlurHash
