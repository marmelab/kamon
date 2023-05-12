import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { registerPartials } from "./partials";
import { registerCustomHelpers } from "./hbsHelpers";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Kamon API")
    .setDescription("The Kamon API that allow you play Kamon where you want")
    .setVersion("1.0")
    .addTag("kamon")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  registerCustomHelpers();

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  app.use(cookieParser());
  registerPartials();

  await app.listen(3000);
}
bootstrap();
