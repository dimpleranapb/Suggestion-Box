"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
      const response = await axios.delete<ApiResponse>("/api/delete-message", {
        data: { messageId: message._id },
      });
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
    <div className="rounded-lg shadow-md hover:transform hover:scale-105 transition-transform">
      <Card className=" shadow-inner bg-gradient-to-r from-[#21284d] to-[#202542]">
        <CardHeader className="p-4 border-b border-black">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-300">
              {message.content}
            </CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="p-2 rounded-md text-red-600 hover:bg-red-700"
                  variant="ghost"
                >
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg font-bold text-gray-900">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-gray-900">
                    This action cannot be undone. This will permanently delete
                    the message from your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-end space-x-4">
                  <AlertDialogCancel className="text-gray-300">
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
          <CardDescription className="text-sm text-gray-400 mt-2">
            Sent on: {new Date(message.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-sm text-gray-400">
            <strong>Message Type:</strong>{" "}
            <span
              className={`font-bold ${
                message.purpose === "feedback"
                  ? "text-blue-400"
                  : message.purpose === "suggestion"
                  ? "text-green-400"
                  : message.purpose === "appreciation"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {message.purpose.charAt(0).toUpperCase() +
                message.purpose.slice(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
