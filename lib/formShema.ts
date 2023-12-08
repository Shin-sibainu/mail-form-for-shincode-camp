import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_MB = 5;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "ユーザー名は2文字以上で入力してください。",
  }),
  subject: z.string().min(2, {
    message: "主題は2文字以上で入力してください。",
  }),
  email: z
    .string()
    .email({ message: "適切なメールアドレスを入力してください。" }),
  content: z
    .string()
    .min(10, {
      message: "本文は10文字以上で入力してください。",
    })
    .max(160, {
      message: "本文は160文字以内で入力してください。",
    }),
  file: z
    .any()
    .refine((files) => files?.length == 1, "ファイル画像が必要です。")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `画像サイズは5MBまでです。`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webpファイルのみ利用できます。"
    ),
});
