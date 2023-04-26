import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { join } from "path";
import { handlebars } from "hbs";
import * as helpers from "handlebars-helpers";
import { NestExpressApplication } from "@nestjs/platform-express";

describe("AppController (e2e)", () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    handlebars.registerHelper("isdefined", function (value) {
      return value !== undefined;
    });

    handlebars.registerHelper("isundefined", function (value) {
      return value == undefined;
    });

    helpers({
      handlebars,
    });

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
