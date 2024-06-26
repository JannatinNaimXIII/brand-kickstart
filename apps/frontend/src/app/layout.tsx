import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans, Work_Sans, JetBrains_Mono } from "next/font/google";
import { clsx } from "clsx/lite";

export const metadata: Metadata = {
    title: "Kickstart Brand",
    description: "Kickstart your brand's app ecosystem.",
};

const josefinSansFont = Josefin_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
});

const workSansFont = Work_Sans({
    subsets: ["latin"],
    variable: "--font-body",
});

const jetBrainsMonoFont = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-code",
});

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;
export default function RootLayout(props: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    josefinSansFont.variable,
                    workSansFont.variable,
                    jetBrainsMonoFont.variable,
                    "bg-neutral-900 font-body text-neutral-100",
                )}
            >
                {props.children}
            </body>
        </html>
    );
}
