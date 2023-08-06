import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drone Shield Client",
  description: "This is an assessment for drone shield",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-gray-200"}>{children}</body>
    </html>
  );
}
