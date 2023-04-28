import { Injectable } from "@nestjs/common";
import { fromEvent } from "rxjs";
import { EventEmitter } from "events";

@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(eventName: string) {
    return fromEvent(this.emitter, eventName);
  }

  async emit(data, eventName: string) {
    this.emitter.emit(eventName, { data });
  }
}
