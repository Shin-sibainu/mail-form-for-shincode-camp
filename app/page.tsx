import MailForm from "../components/MailForm";

export default function Home() {
  return (
    <main className="p-24 flex flex-col items-center">
      <h2 className="font-semibold text-2xl mb-4">メールフォーム</h2>
      <MailForm />
    </main>
  );
}
