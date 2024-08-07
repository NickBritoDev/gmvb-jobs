import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProviderGlobal } from "@/provider/chakra-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GMVB JOBS",
  description: "Generated by desenvolvimento mais valor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ChakraProviderGlobal>
          {children}
        </ChakraProviderGlobal>
      </body>
    </html>
  );
}
