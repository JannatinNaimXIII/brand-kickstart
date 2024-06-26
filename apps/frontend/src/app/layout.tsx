import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kickstart Brand",
    description: "Kickstart your brand's app ecosystem.",
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;
export default function RootLayout(props: RootLayoutProps) {
    return (
        <html lang="en">
            <body className="bg-background">{props.children}</body>
        </html>
    );
}
