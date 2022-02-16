import { eventWithTime } from "rrweb/typings/types";
import api from "../api";

export function postRecordings(session_uuid: string, recordings: eventWithTime[], viewSlug: string) {
  return api.post("record", {session_uuid, recdata: JSON.stringify({ recordings }), viewSlug})
}