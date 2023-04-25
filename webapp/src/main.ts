import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { registerPartials } from "./partials";
import * as helpers from "handlebars-helpers";
import { handlebars } from "hbs";

helpers({
  handlebars,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  registerPartials();

  await app.listen(3000);
}
bootstrap();
