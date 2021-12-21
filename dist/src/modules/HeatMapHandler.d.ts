export declare type HeatMapHandlerParams = {
    scrollMap: boolean;
    clickMap: boolean;
    hoverMap: boolean;
    attentionMap: boolean;
};
export declare type HeatMap = {
    x: number;
    y: number;
    value: number;
    date: Date;
    event?: Event;
    type: string;
};
declare class HeatMapHandler {
    private data;
    init({ scrollMap, clickMap, hoverMap }: HeatMapHandlerParams): void;
    private startPolling;
    private sendHeatMaps;
    private initScrollMaps;
    private initClickMaps;
    private listenToEvent;
    private initHoverMaps;
    private addData;
}
export default HeatMapHandler;
