import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create For MM 804 Assignment 3 By Dharan Padhiyar",
  description: "2017 Edmonton General Election - Official Results Visualization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}
      >
        {children}
      </body>
    </html>
  );
}
