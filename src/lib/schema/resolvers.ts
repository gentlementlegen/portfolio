import nodemailer from 'nodemailer'
import UserDocument, { User } from 'lib/models/User'
import { GraphQLError } from 'graphql'
import { SkillMutations, SkillQueries, SkillResolvers } from 'lib/schema/skillResolvers'
import { ProjectMutations, ProjectQueries, ProjectResolvers } from 'lib/schema/projectResolvers'

const resolvers = {
  Mutation: {
    async login(parent, args: { username: string; password: string }) {
      const { username, password } = args
      const user = await UserDocument.findOne<User>({ username, password })
      if (!user) throw new GraphQLError('Could not login')
      return `successfully logged in as ${user.username}`
    },
    sendEmail: async (parent, args: { name: string; email: string; message: string }) => {
      const { name, email, message } = args
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

      return info.response
    },
    ...ProjectMutations,
    ...SkillMutations,
  },
  Query: {
    ...ProjectQueries,
    ...SkillQueries,
  },
  ...ProjectResolvers,
  ...SkillResolvers,
}

export default resolvers
