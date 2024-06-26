import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, VersioningType } from "@nestjs/common";
import * as request from "supertest";
import { PingModule } from "../src/ping/ping.module";

describe("PingController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [PingModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.enableCors({
            origin: true,
            credentials: true,
        });

        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: "1",
        });

        await app.init();
    });

    it("/v1/ping (GET)", () => {
        return request(app.getHttpServer()).get("/v1/ping").expect(200).expect({ message: "Pong!" });
    });

    afterAll(() => {
        app.close();
    });
});
