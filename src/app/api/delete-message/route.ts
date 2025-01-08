import UserModel from '@/model/User';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from './../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  // Parse the JSON body of the request to extract messageid
  const { messageId } = await request.json();

  if (!messageId) {
    return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user = session?.user as { _id: string } | undefined;

  if (!session || !_user) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Message not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting message' },
      { status: 500 }
    );
  }
}
