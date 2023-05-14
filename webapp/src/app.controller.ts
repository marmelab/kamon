import { Controller, Get, Render } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller()
@ApiExcludeController()
export class AppController {
  @Get("/")
  @Render("userForm")
  registerView() {
    return { action: "/register", title: "Register" };
  }

  @Get("/login")
  @Render("userForm")
  signView() {
    return { action: "/login", title: "Login" };
  }
}
