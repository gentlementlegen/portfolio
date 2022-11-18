import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body.data
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: `New message from ${name}`,
    text: `From: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  })
  res.status(info.accepted ? 200 : 500).json(info.response)
}
