import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {

    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        })
      ],
      jwt: {
        encryption: true
      },
      secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions)