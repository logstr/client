import WebRecorder from "./modules/Recorder";
export declare type SessionUser = {
    id: number;
    uuid: string;
    username: string;
    emailaddress: string;
};
export declare type SessionContext = {
    [k: string]: any;
};
export declare type Session = {
    uuid: string;
    user: SessionUser;
    start_time: Date;
    end_time: Date;
    context: SessionContext;
    ip: string;
    device: string;
    navigator: object;
};
declare class Client {
    session: Session;
    protected recorder: WebRecorder;
    constructor();
    init(projectId: string, user: Partial<SessionUser>, context: SessionContext): Promise<void>;
    updateContext(context: SessionContext): Promise<void>;
    private write;
    log(...params: any[]): void;
    error(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
}
export default Client;
