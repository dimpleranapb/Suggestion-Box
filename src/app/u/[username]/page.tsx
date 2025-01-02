'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { messageSchema } from "@/schemas/messageSchema";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ProfileForm() {
  const { toast } = useToast();
  const pathname = usePathname();
  const username = pathname.split("/")[2];

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  // Use isSubmitting to disable input and button while submitting
  const { isSubmitting, isSubmitted } = form.formState;

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post("/api/send-message", { username, content: data.content });
      toast({
        title: "Message Sent",
        description: response.data.message,
      });

      form.reset({
        content: "", 
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="justify-center align-middle p-2 md:p-10">
      <div className="py-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col px-20">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Message"
                      {...field}
                      disabled={isSubmitting} // Disable input while submitting or after submission
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting}> {/* Disable button while submitting or after submission */}
                {isSubmitting ? "Submitting..." :"Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
