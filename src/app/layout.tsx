import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "대광생활건강 | 가정용 돔 사우나",
  description: "내 몸의 온도를 1도 올리는 습관, 일상이 달라집니다. 접이식 이동이 편한 가정용 돔 사우나",
  keywords: "돔사우나, 가정용사우나, 홈사우나, 접이식사우나, 원적외선사우나, 대광생활건강",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
