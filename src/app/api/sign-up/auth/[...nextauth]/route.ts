import NextAuthOptions from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt"

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name:" Credentials",
            credentials: {
                email: { label: "email", type: "text",},
                password: { label: "Password", type: "password" }
              },
              async authorize(Credentials:any): Promise<any>{
                    await dbConnect()
                    try{
                        await UserModel.findOne({
                            $or:[
                                {email: credentials.identifier},
                                {username: credentials.identifier}
                            ]
                        })
                        if(!user){
                            throw new Error('no User found with this email')
                        }

                        if(!user.isVerified){
                            throw new Error('Please verify your account before login')
                        }
                        await bcrypt
                    }catch(err: any) {
                        throw new Error(err)

                    }
              }        })
    ]
}