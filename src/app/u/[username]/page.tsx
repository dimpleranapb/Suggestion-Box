"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { messageSchema } from "@/schemas/messageSchema";
import axios, { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import Squares from "@/components/Squares";
import ShinyText from "@/components/ShinyText";

export default function ProfileForm() {
  const { toast } = useToast();
  const pathname = usePathname();
  const username = pathname.split("/")[2]; // Extract username from the path.

  // Initialize the form with validation and default values.
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "", purpose: "feedback" },
  });

  const { isSubmitting } = form.formState; // Track submission state.

  // Handle form submission.
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content,
        purpose: data.purpose, 
      });

      toast({
        title: "Message Sent",
        description: response.data.message,
      });

      // Reset the form after successful submission.
      form.reset({ content: "", purpose: "feedback" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Squares
      speed={0.5}
      squareSize={40}
      direction="diagonal"
      borderColor="#fff"
      hoverFillColor="#222"
    >
      {/* Description and Form */}
      <div className="  w-full h-full py-3 flex flex-col justify-center items-center bg-black/80 px-4">
        {/* Description */}
        <div className="max-w-2xl sm:mt-10 text-white text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Anonymous Feedback Form
          </h1>
          <p className="mb-2">
            We’ve created this <strong>anonymous feedback form</strong> to
            improve teamwork and the workplace environment. Share your honest
            feedback, suggestions, or complaints without revealing your
            identity.
          </p>
          <ul className="list-disc list-inside text-left">
            <li>
              Issues with the <strong>working environment</strong>.
            </li>
            <li>
              Concerns about <strong>colleagues, teammates, or leaders</strong>.
            </li>
            <li>
              Feedback on <strong>management, policies, or decisions</strong>.
            </li>
            <li>
              Ideas for <strong>new initiatives or improvements</strong>.
            </li>
            <li>
              Suggestions for <strong>training and development</strong>.
            </li>
            <li>
              Anything you’re{" "}
              <strong>uncomfortable discussing in person</strong>.
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="w-full max-w-md bg-transparent rounded-lg shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col px-6"
            >
              {/* Textarea for Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-white">
                      Feedback or Suggestions
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Your message here..."
                        {...field}
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full p-4 text-md text-black font-semibold bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dropdown for Purpose */}
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-white">
                      Purpose of Message
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={isSubmitting}
                        className="w-full p-4 text-md text-black font-semibold bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="feedback">Feedback</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="appreciation">Appreciation</option>
                        <option value="complaint">Complaint</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" disabled={isSubmitting}>
                  <ShinyText
                    text={isSubmitting ? "Sending..." : "Send Message"}
                    disabled={false}
                    speed={0.5}
                    className="text-lg font-semibold"
                  />
                </Button>
              </div>
            </form>
          </Form>
          <p className="mt-4 text-white text-center">
            Feel free to share openly—whether it’s{" "}
            <b>appreciating a teammate</b> or <b>highlighting an issue</b>{" "}
            that needs attention.
          </p>
        </div>
      </div>
    </Squares>
  );
}
