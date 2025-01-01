import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { Session } from "next-auth"
import { User } from "next-auth"
import { NextResponse } from "next/server";
import mongoose from "mongoose"

export async function GET(request: Request) {
    await dbConnect()
    const session:Session | null = await getServerSession(authOptions)
    const user = session?.user
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        },
            { status: 401 })
    }
    const userId = new mongoose.Types.ObjectId(user?._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { id: userId } }, // Match the user by ID
            { $unwind: '$messages' }, // Unwind the messages array
            { $sort: { 'messages.createdAt': -1 } }, // Sort messages by createdAt descending
            { 
                $group: { 
                    _id: '$_id', // Group by user ID
                    messages: { $push: '$messages' } // Push all messages into an array
                }
            }
        ]);
        if(!user || user.length ===0){
            return Response.json({
                success: false,
                message: "User not found"
            },
                { status: 401 })
        }
        return Response.json({
            success: true,
            message: user[0].messages
        },
            { status: 200 })
    } catch (error) {
        console.log("an unexpected error occurred", error)
        return Response.json({
            success: false,
            message: "an unexpected error occurred"
        },
            { status: 500 })
    }
}