import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Your AI Health Coach - Transform Your Wellness Journey",
    description: "Achieve your wellness goals with personalized AI-powered guidance and support. Track progress, get instant feedback, and stay motivated.",
    keywords: "AI health coach, wellness, fitness, health tracking, personalized coaching",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
