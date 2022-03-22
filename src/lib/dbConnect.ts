// /lib/dbConnect.js
import mongoose from 'mongoose'
// import { GridFsStorage } from 'multer-gridfs-storage'

/**
 Source :
 https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
 **/

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// export const storage = new GridFsStorage({
//   url: MONGODB_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const filename = file.originalname
//       const fileInfo = {
//         filename: filename,
//         bucketName: 'uploads',
//       }
//       resolve(fileInfo)
//     })
//   },
// })

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Init gfs
export let gfs: typeof mongoose['mongo']['GridFSBucket']['prototype']

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        gfs = new mongooseInstance.mongo.GridFSBucket(mongooseInstance.connection.db, { bucketName: 'files' })
      })
      .then((mongooseInstance) => {
        return mongooseInstance
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
