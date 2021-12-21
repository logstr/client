import { record, getRecordConsolePlugin } from "rrweb";
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
  }

  init() {
    record({
      emit: (e) => this.addEvent(e),
      plugins: [getRecordConsolePlugin()],
    });
    this.startScheduler();
  }

  private startScheduler() {
    this.timeout = setTimeout(() => {
      requestAnimationFrame(async () => {
        try {
          await postRecordings(this.client.session.uuid, this.events);
        } catch (e) {
        } finally {
          this.events = [];
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
