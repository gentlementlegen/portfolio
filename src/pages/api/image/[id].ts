import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { getGfs } from 'lib/dbConnect'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(req.query.id)
  return getGfs()
    .then(async (gfs) => {
      const readStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(req.query.id as string))
      readStream.pipe(res)
      return res
    })
    .catch((e) => res.status(500).json(e.toString()))
}

export default handler
