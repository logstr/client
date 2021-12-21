import { eventWithTime } from "rrweb/typings/types";
export declare function postRecordings(sessionUUID: string, recordings: eventWithTime[]): Promise<import("../api/client").ApiResponse<any>>;
