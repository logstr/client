import api from "../api";
import { ApiResponse } from "../api/client";
import { SessionContext, SessionUser, Session } from "../Client";

export function startSession(
  project_id: string,
  user: Partial<SessionUser>,
  context: SessionContext
): Promise<Session> {
  return api
    .post("session", { project_id, ...user, context, startTime: new Date()})
    .then(({ data }: ApiResponse<any>) => {
      console.log(data);
      return {uuid: data.session, user: data.sessionuser} as Session;
    });
}

export function updateContext(sessionUuid: string, context: SessionContext): Promise<Session> {
  return api
    .put("session/update", { sessionUuid, context })
    .then(({ data }: ApiResponse<Session>) => data);
}
