import GlobalProvider from "@/components/hoc/GlobalProvider";
import "./globals.css";

import localFont from "next/font/local";

const banglaFont = localFont({
  src: "./fonts/bangla.ttf",
  variable: "--font-bangla",
  weight: "400 500 600 700",
});

const englishFont = localFont({
  src: "./fonts/arial.ttf",
  variable: "--font-english",
  weight: "400 500 600 700",
});

const signatureFont = localFont({
  src: "./fonts/sign.otf",
  variable: "--font-signature",
  weight: "400 500 600 700",
});

export const metadata = {
  title: "NID GENERATOR",
  description: "Generate NID card",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${banglaFont.variable} ${englishFont.variable} ${signatureFont.variable}`}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
