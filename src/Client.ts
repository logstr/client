
import { startSession, updateContext } from "./services/sessions"
import { LogLevel, EventType } from "rrweb";

import WebRecorder from "./modules/Recorder";

export type SessionUser = {
  id: number;
  uuid: string;
  name: string;
  emailAddress: string;
}

export type SessionContext = {
  [k: string]: any
}

export type Session = {
  uuid: string;
  user: SessionUser;
  start_time: Date;
  end_time: Date;
  context: SessionContext
}

class Client  {
  session: Session;
  protected recorder: WebRecorder = new WebRecorder(this);

  constructor() {
    this.session = {} as Session;
  }

  async init(user: Partial<SessionUser>, context: SessionContext) {
    try {
      this.session = await startSession(user, context)
    } catch(e) {

    } finally {
      this.recorder.init();
    }

  }

  async updateContext(context: SessionContext) {
    this.session = await updateContext(this.session.uuid, context);
  }

  private write(level: LogLevel, payload: any[], trace?: any[]) {
    this.recorder.addEvent({
      type: EventType.Plugin,
      timestamp: Date.now(),
      data: {
        plugin: 'rrweb/console@1',
        payload: {
          level,
          payload,
          trace
        }
      }
    })
  }

  log(...params: any[]) {
    this.write('log', params);
  }

  error(...params: any[]) {
   this.write('error', params, []);
  }

  info(...params: any[]) {
    this.write('info', params)
  }

  warn(...params: any[]) {
    this.write('warn', params)
  }
}

export default Client;