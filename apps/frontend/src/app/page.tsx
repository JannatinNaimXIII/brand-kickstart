import { Client } from "@kickstart-brand/sdk";

export default async function Home() {
    const api = new Client({
        url: "http://localhost:4200/",
    });

    const result = await api.ping.getPing({
        message: "Ping!",
    });

    console.log(result.status);

    return (
        <main>
            <h1 className="text-primary">Kickstart Brand</h1>
        </main>
    );
}
