//https://github.com/itkr/my-file-input-example/blob/main/src/hooks/useFileInput.tsx
//https://reffect.co.jp/react/shadcn-react
"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import useMailForm from "@/app/hooks/useMailForm";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MailForm = () => {
  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: "",
  //     email: "",
  //     content: "",
  //     file: null,
  //   },
  // });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  const { form, onSubmit } = useMailForm();

  // 送信成功時にトーストを表示
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast.success("メール送信に成功しました！");
    }
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Form {...form}>
      <ToastContainer />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 container"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input {...field} placeholder="お名前" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} placeholder="メールアドレス" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主題</FormLabel>
              <FormControl>
                <Input {...field} placeholder="主題" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="本文"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...fieldProps}
                  accept="image/*"
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-3"
          style={{ width: "100%" }}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <ClipLoader /> : "送信"}
        </Button>
      </form>
    </Form>
  );
};

export default MailForm;
