import { eventWithTime } from "rrweb/typings/types";
import Client from "../Client";
declare class WebRecorder {
    events: eventWithTime[];
    private timeout?;
    private client;
    constructor(client: Client);
    init(): void;
    private startScheduler;
    addEvent(event: eventWithTime): void;
}
export default WebRecorder;
