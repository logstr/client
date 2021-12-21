import { SessionContext, SessionUser, Session } from "../Client";
export declare function startSession(user: Partial<SessionUser>, context: SessionContext): Promise<Session>;
export declare function updateContext(sessionUuid: string, context: SessionContext): Promise<Session>;
