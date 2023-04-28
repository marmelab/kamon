import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { registerCustomHelpers } from "./../src/hbsHelpers";

describe("AppController (e2e)", () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    registerCustomHelpers();

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.setViewEngine("hbs");
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200);
  });
});
