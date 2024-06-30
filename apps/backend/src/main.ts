import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import * as morgan from "morgan";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import metadata from "./lib/swagger/metadata";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(morgan("tiny"));

    app.enableCors({
        origin: true,
        credentials: true,
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    const swaggerDocumentConfig = new DocumentBuilder()
        .setTitle("Brand Kickstart")
        .setDescription("Kickstart your brand's app ecosystem.")
        .setVersion("0.0.1")
        .build();
    const swaggerDocumentOptions: SwaggerDocumentOptions = {
        operationIdFactory: (_: string, methodKey: string) => methodKey,
    };

    await SwaggerModule.loadPluginMetadata(metadata);

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentConfig, swaggerDocumentOptions);

    const swaggerSetupOptions: SwaggerCustomOptions = {
        explorer: true,
        customSiteTitle: "Brand Kickstart | Swagger API Spec",
    };
    SwaggerModule.setup("docs", app, swaggerDocument, swaggerSetupOptions);

    await app.listen(4200);
}

bootstrap();
