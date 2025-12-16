import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "CKAY9 Dev",
  description: "Hi, I'm Cameron Armstrong (CKAY9, CKAY-9, whatever), a developer from Vancouver, BC. I've been programming for multiple years now, and have experience in multiple services and tools like Vercel, AWS, Git, Cloudflare, etc. I'm also comfortable in many different programming languages and their framework and libraries (e.g. Python and Flask/FastAPI/DJango).",
  icons: [
    "https://avatars.githubusercontent.com/u/53030585?v=4"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
