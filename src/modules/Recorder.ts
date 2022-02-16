import { record, getRecordConsolePlugin, EventType, IncrementalSource } from "rrweb";
import { eventWithTime } from "rrweb/typings/types";
import Client from "../Client";
import { postRecordings } from "../services/recordings";
import { POLLING_LENGTH } from "../constants";

class WebRecorder {
  events: eventWithTime[] = [];
  private timeout?: ReturnType<typeof setTimeout>;
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    console.log(EventType, IncrementalSource)
  }

  init() {
    record({
      emit: (e) => this.addEvent(e),
      plugins: [getRecordConsolePlugin()],
      recordCanvas: true,
    });
    this.startScheduler();
  }

  private startScheduler() {
    this.timeout = setTimeout(() => {
      requestAnimationFrame(async () => {
        try {
          if(this.events.length) {
            await postRecordings(this.client.session.uuid, this.events, window.location.href);
            this.events = [];
          }
        } catch (e) {
        } finally {
          this.startScheduler();
        }
      });
    }, POLLING_LENGTH);
  }

  public addEvent(event: eventWithTime) {
    this.events.push(event);
  }
}

export default WebRecorder;
