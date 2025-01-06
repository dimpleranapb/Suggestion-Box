'use client'
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useSession } from "next-auth/react";
import React, { Key, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { useToast } from "@/hooks/use-toast";
import CountUp from "@/components/CountUp";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const handleDeleteMessage = async (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  };

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description: axiosError.response?.data.message ?? "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setValue, toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to update message settings",
        variant: "destructive",
      });
    }
  };


  const { username } = session?.user as User;
  const profileUrl = `${window.location.protocol}//${window.location.host}/u/${username}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  };

  if (isLoading || !session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-bottom">
        <ClimbingBoxLoader />
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-transparent p-8 text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-center">User Dashboard</h1>
      <h2 className="text-xl font-semibold mb-6 text-center">
        Welcome, <span className="text-purple-300">{username}</span>!
      </h2>

      <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="bg-gray-800 text-white rounded-lg p-2 flex-grow mr-2 focus:ring focus:ring-purple-500"
          />
          <Button onClick={copyToClipboard} className="bg-btn-gradient">
            Copy
          </Button>
        </div>
      </div>

      <div className="flex items-center bg-gray-900 bg-opacity-50 p-6 rounded-lg mb-6">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
          className="bg-black"
        />
        <span className="ml-3 text-sm font-medium">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>

      <Separator className="my-6" />

      <Button
        className="bg-btn-gradient flex items-center justify-center mx-auto"
        onClick={() => fetchMessages(true)}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4 mr-2" />
        )}
        Refresh Messages
      </Button>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold">Total Messages Received:</h2>
        <CountUp
          from={0}
          to={messages.length}
          separator=","
          direction="up"
          duration={1}
          className="text-3xl font-extrabold"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id as Key}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
