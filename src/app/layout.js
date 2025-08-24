import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { ThemeProvider } from "next-themes";
import Provider from "./provider";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexBuy",
  description: "Manage Your Product With NexBuy",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Toaster  position="top-right"
  reverseOrder={false}/>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
           <NavbarWrapper></NavbarWrapper>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
