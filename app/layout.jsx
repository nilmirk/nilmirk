import "@/styles/globals.scss";
import { Manrope } from "next/font/google";
import { Header } from "@/components/server";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-manrope"
});

export const metadata = {
  title: "nilmirk",
  description: "nilmirk",
  icons: {
    icon: "/icon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <Header />
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
