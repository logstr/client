interface Client {
    get: Function;
    post: Function;
    baseUrl: string;
    authToken: string;
}
export interface ApiResponse<T> {
    statusCode: Number;
    statusText: string;
    data: T;
}
export default class ApiClient implements Client {
    baseUrl: string;
    protected maxAuthRetries: number;
    private maxFailedFetchRetries;
    constructor(baseUrl: string);
    onUnauthorized(): Promise<unknown>;
    get(url: string, params?: Object, options?: Object): Promise<ApiResponse<any>>;
    post(url: string, body?: Object, options?: any): Promise<ApiResponse<any>>;
    put(url: string, body?: Object, options?: any): Promise<ApiResponse<any>>;
    patch(url: string, body?: Object, options?: any): Promise<ApiResponse<any>>;
    delete(url: string, body?: Object, options?: any): Promise<ApiResponse<any>>;
    get authToken(): string;
    get trailingSlash(): string;
    private formUrl;
    private absoluteUrl;
    private send;
    private sendForJson;
}
export {};
