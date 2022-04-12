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
let gfs: typeof mongoose['mongo']['GridFSBucket']['prototype'] = global.gfs

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

if (!gfs) {
  gfs = global.gfs = null
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise || Object.keys(cached.promise).length === 0) {
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
        return mongooseInstance
      })
      .then((mongooseInstance) => {
        return mongooseInstance
      })
      .catch((e) => {
        console.log('Failed to instantiate mongoose', e)
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export async function getGfs() {
  if (gfs) {
    return gfs
  }
  const db = await dbConnect()
  gfs = new db.mongo.GridFSBucket(db.connection.db, { bucketName: 'files' })
  return gfs
}

export default dbConnect
