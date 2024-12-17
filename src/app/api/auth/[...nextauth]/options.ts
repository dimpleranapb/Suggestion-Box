import { NextAuthConfig } from "next-auth";
import bcrypt from "bcrypt"; // Import bcrypt for password comparison
import CredentialsProvider from "next-auth/providers/credentials"; // Use credentials provider
import dbConnect from "@/lib/dbConnect"; // Import database connection utility
import UserModel from "@/model/User"; // Import User model

// Export the authentication configuration
export const authOptions: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            id: "credentials", // Custom identifier for the provider
            name: "Credentials", // Display name on the sign-in page
            credentials: {
                email: { label: "email", type: "text" }, // Email input field
                password: { label: "Password", type: "password" } // Password input field
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect(); // Ensure database connection

                try {
                    // Find a user by email or username
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });

                    // If no user is found, throw an error
                    if (!user) {
                        throw new Error('No user found with this email/username');
                    }

                    // Check if the user's account is verified
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');
                    }

                    // Compare the provided password with the hashed password in the database
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user; // Return the user object on successful authentication
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (err: any) {
                    throw new Error(err.message || 'Authentication failed'); // Handle errors
                }
            }
        })
    ],
    callbacks: {
        // JWT callback to add custom fields to the token
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString(); // Add user ID to the token
                token.isVerified = user.isVerified; // Add verification status
                token.isAcceptingMessages = user.isAcceptingMessages; // Add custom field
                token.username = user.username; // Add username to the token
            }
            return token; // Return the updated token
        },

        // Session callback to include custom fields in the session object
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id; // Attach user ID
                session.user.isVerified = token.isVerified; // Attach verification status
                session.user.isAcceptingMessages = token.isAcceptingMessages; // Attach custom field
                session.user.username = token.username; // Attach username
            }
            return session; // Return the updated session
        }
    },
    pages: {
        signIn: '/sign-in' // Custom sign-in page
    },
    session: {
        strategy: 'jwt' // Use JWT for session handling
    },
    secret: process.env.NEXTAUTH_SECRET // Authentication secret
};
