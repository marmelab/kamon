import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import helpers from "handlebars-helpers";

import { handlebars } from "hbs";

handlebars.registerHelper("isdefined", function (value) {
  return value !== undefined;
});

handlebars.registerHelper("isundefined", function (value) {
  return value == undefined;
});

helpers({ handlebars });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  await app.listen(3000);
}
bootstrap();
