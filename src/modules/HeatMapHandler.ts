import { POLLING_LENGTH } from "../constants";

export type HeatMapHandlerParams = {
  scrollMap: boolean;
  clickMap: boolean;
  hoverMap: boolean;
  attentionMap: boolean;
};

export type HeatMap = {
  x: number;
  y: number;
  value: number;
  date: Date;
  event?: Event;
  type: string;
};

class HeatMapHandler {
  private data: HeatMap[] = [];

  init({ scrollMap, clickMap, hoverMap }: HeatMapHandlerParams) {
    scrollMap && this.initScrollMaps();
    clickMap && this.initClickMaps();
    hoverMap && this.initHoverMaps();
    this.startPolling();
  }

  private startPolling() {
    setTimeout(() => {
      requestAnimationFrame(async () => {
        this.sendHeatMaps();
        this.startPolling();
      });
    }, POLLING_LENGTH);
  }

  private sendHeatMaps() {
    if (this.data.length) {
      const data = this.data;
      this.data = [];
      console.log(data);
    }
  }

  private initScrollMaps() {
    document.addEventListener("scroll", (e) => {
      const doc = document.documentElement;
      this.addData({
        type: e.type,
        date: new Date(e.timeStamp * 1000),
        x: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
        y: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
        value: 1,
      });
    });
  }

  private initClickMaps() {
    this.listenToEvent("click");
  }

  private listenToEvent(event: "click" | "mousemove") {
    document.addEventListener(event, (e) => {
      this.addData({
        type: e.type,
        date: new Date(e.timeStamp * 1000),
        value: 1,
        x: e.x,
        y: e.y,
      });
    });
  }

  private initHoverMaps() {
    this.listenToEvent("mousemove");
  }

  private addData(event: HeatMap) {
    this.data.push(event);
  }
}

export default HeatMapHandler;
