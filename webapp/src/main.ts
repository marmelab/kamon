import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { registerPartials } from "./partials";
import { registerCustomHelpers } from "./hbsHelpers";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  registerCustomHelpers();

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  registerPartials();

  await app.listen(3000);
}
bootstrap();
