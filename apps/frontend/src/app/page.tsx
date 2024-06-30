import { Client } from "@brand-kickstart/sdk";

export default async function Home() {
    const api = new Client({
        url: "http://localhost:4200/",
    });

    const result = await api.ping.getPing({
        message: "Ping!",
    });

    if (result.status === "success") {
        console.log(result.body.message);
    }

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-center font-heading text-6xl">Kickstart Brand</h1>
            <p className="text-lg">Kickstart your brand&apos;s ecosystem.</p>
        </main>
    );
}
