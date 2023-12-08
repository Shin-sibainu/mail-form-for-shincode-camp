import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { EmailTemplate } from "@/components/email-template";
import { array } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // const { username, subject, email, content, file } = await request.json();
  // console.log(username, subject, email, content, file);

  const formData = await request.formData();

  const username = formData.get("username");
  const email = formData.get("email");
  const content = formData.get("content");
  const subject = formData.get("subject");
  // console.log(username, email, content, subject);
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(file.name);
  console.log(buffer);

  // 値が string であることを確認する
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof content !== "string" ||
    typeof subject !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  try {
    const { data, error } = await resend.emails.send({
      //   from: "Acme <onboarding@resends.dev>",
      from: "onboarding@resend.dev",
      to: ["shincode0712@gmail.com"],
      //   to: ["delivered@resend.dev"],
      subject: subject,
      attachments: [{ filename: file.name, content: buffer }],
      react: EmailTemplate({
        username,
        email,
        content,
      }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
