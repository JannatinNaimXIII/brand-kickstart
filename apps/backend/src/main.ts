import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        credentials: true,
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    await app.listen(4200);
}

bootstrap();
