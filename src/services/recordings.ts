import { eventWithTime } from "rrweb/typings/types";
import api from "../api";

export function postRecordings(sessionUUID: string, recordings: eventWithTime[]) {
  return api.post("recordings/add", {sessionUUID, recordings})
}