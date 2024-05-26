"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { use, useEffect, useState } from "react";
import { Image } from "next/image";

import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Upload file using standard upload
async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${file.name}`, file, { upsert: true });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

const formSchema = z.object({
  file: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export default function Home() {
  const [pic, setPic] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  const onSubmit = (submitData: z.infer<typeof formSchema>) => {
    if (submitData.file) {
      uploadFile(submitData.file[0]);
    }
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(submitData.file[0].name);
    console.log(data);
    setPic(data.publicUrl);
  };

  useEffect(() => {
    console.log(pic);
  }, [pic]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="shadcn" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {pic && <img src={pic} alt="uploaded" width={100} height={100} />}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
