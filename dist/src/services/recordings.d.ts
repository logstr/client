import { eventWithTime } from "rrweb/typings/types";
export declare function postRecordings(session_uuid: string, recordings: eventWithTime[], viewSlug: string): Promise<import("../api/client").ApiResponse<any>>;
