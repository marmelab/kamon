import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHighlightedBoard() {
    return;
  }

  getHello(): string {
    return "Hello World!";
  }
}
