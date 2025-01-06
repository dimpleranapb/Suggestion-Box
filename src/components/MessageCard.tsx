"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export default function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast({
        title: "Message Deleted",
        description: response.data.message,
        variant: "default",
      });
      onMessageDelete(message._id as string);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-lg shadow-md bg-gray dark:bg-gray-800">
      <Card className="bg-gray-200 shadow-xl dark:from-gray-800 dark:to-gray-900 shadow-inner">
        <CardHeader className="p-4 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {message.content}
            </CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                  variant="ghost"
                >
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg font-bold">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                    This action cannot be undone. This will permanently delete
                    the message from your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-end space-x-4">
                  <AlertDialogCancel className="text-gray-600 dark:text-gray-300">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={handleDeleteConfirm}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Sent on: {new Date(message.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          {/* Add additional content or actions if needed */}
        </CardContent>
      </Card>
    </div>
  );
}
