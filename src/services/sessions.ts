import api from "../api";
import { ApiResponse } from "../api/client";
import { SessionContext, SessionUser, Session } from "../Client";

export function startSession(
  user: Partial<SessionUser>,
  context: SessionContext
): Promise<Session> {
  return api
    .post("session/start", { user, context })
    .then(({ data }: ApiResponse<Session>) => data);
}

export function updateContext(sessionUuid: string, context: SessionContext): Promise<Session> {
  return api
    .put("session/update", { sessionUuid, context })
    .then(({ data }: ApiResponse<Session>) => data);
}
