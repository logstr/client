import WebRecorder from "./Recorder";
declare class Logger {
    protected recorder: WebRecorder;
    private write;
    log(...params: any[]): void;
    error(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
}
export default Logger;
