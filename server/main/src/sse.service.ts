import { Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SseService {
  private events = new Subject();

  addEvent(event) {
    this.events.next(event);
  }

  sendEvents() {
    return this.events.asObservable();
  }
}
