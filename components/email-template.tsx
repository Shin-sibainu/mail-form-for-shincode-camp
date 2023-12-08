interface EmailTemplateProps {
  username: string;
  email: string;
  content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  email,
  content,
}) => (
  <div>
    <h1>こんにちは, {username}です。</h1>
    <p>{email}から届きました。</p>
    <p>{content}</p>
  </div>
);
