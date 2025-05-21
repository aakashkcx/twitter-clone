"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createTweetAction } from "@/server/tweets/actions";
import { createTweetSchema } from "@/server/tweets/schema";

export function TweetForm({
  parentId,
  placeholder,
}: {
  parentId?: string;
  placeholder?: string;
}) {
  const form = useForm<z.infer<typeof createTweetSchema>>({
    resolver: zodResolver(createTweetSchema),
    defaultValues: {
      text: "",
      parentId,
    },
  });

  async function onSubmit(values: z.infer<typeof createTweetSchema>) {
    const error = await createTweetAction(values);
    form.setError("root", { message: error });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {form.formState.errors.root && (
          <Alert variant="destructive" className="border-destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  className="md:text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          Tweet
        </Button>
      </form>
    </Form>
  );
}
