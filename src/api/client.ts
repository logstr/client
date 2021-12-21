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

  protected maxAuthRetries: number = 0;

  private maxFailedFetchRetries: number = 3;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  onUnauthorized(): Promise<unknown> {
    return Promise.resolve();
  }

  get(
    url: string,
    params?: Object,
    options?: Object
  ): Promise<ApiResponse<any>> {
    return this.sendForJson(this.formUrl(url, params), undefined, options);
  }

  post(url: string, body?: Object, options?: any): Promise<ApiResponse<any>> {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "POST"
    });
  }

  put(url: string, body?: Object, options?: any): Promise<ApiResponse<any>> {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "PUT"
    });
  }

  patch(url: string, body?: Object, options?: any): Promise<ApiResponse<any>> {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "PATCH"
    });
  }

  delete(url: string, body?: Object, options?: any): Promise<ApiResponse<any>> {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "DELETE"
    });
  }

  get authToken(): string {
    return "";
  }

  get trailingSlash(): string {
    return "/";
  }

  private formUrl(url: string, query?: Object): string {
    const params: any = query || {};
    return Object.keys(params).reduce((acc: URL, key) => {
      acc.searchParams.set(key, params[key]);
      return acc;
    }, new URL(this.absoluteUrl(url))).href;
  }

  private absoluteUrl(url: string): string {
    return `${this.baseUrl}/${url}${this.trailingSlash}`.replace(
      /([^:]\/)\/+/g,
      "$1"
    );
  }

  private send(
    url: string,
    body?: Object,
    options?: Object
  ): Promise<Response> {
    let requestObject: RequestInit = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authToken
          ? `Bearer ${this.authToken}`
          : this.authToken
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      ...(options || {}),
      body: (() => {
        if (!body) {
          return null;
        } else if (typeof body === "object") {
          return JSON.stringify(body);
        } else {
          return body;
        }
      })()
    };
    return fetch(url, requestObject);
  }

  private sendForJson(
    url: string,
    body?: Object,
    options?: Object,
    authRetries: number = 0,
    fetchFailedRetries: number = 0
  ): Promise<ApiResponse<any>> {
    return this.send(url, body, options)
      .then(res => {
        // Handling no content success response from backend
        if (res.status === 204) {
          return {
            res,
            data: {}
          };
        }
        return res
          .json()
          .then(data => {
            return {
              res,
              data
            };
          })
          .catch(err => {
            console.error(err);
            throw new Error("Invalid api response! Expected parsable json!");
          });
      })
      .then(({ res, data }) => {
        if (res.ok) {
          return {
            statusCode: res.status,
            statusText: res.statusText,
            data
          };
        } else if (res.status === 401) {
          if (authRetries < this.maxAuthRetries) {
            return this.onUnauthorized().then(() => {
              return this.sendForJson(url, body, options, authRetries + 1);
            });
          } else {
            return Promise.reject({
              statusCode: res.status,
              statusText: res.statusText,
              data
            });
          }
        } else {
          return Promise.reject({
            statusCode: res.status,
            statusText: res.statusText,
            data
          });
        }
      })
      .catch(err => {
        if (err instanceof TypeError && err.message === "Failed to fetch") {
          console.error(`Problem in fetching ${url}! Retrying in 5sec`);
          console.error("Detailed error: ", err);
          if (fetchFailedRetries < 2) {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                  this.sendForJson(
                    url,
                    body,
                    options,
                    authRetries,
                    fetchFailedRetries + 1
                  )
                );
              }, 5000);
            });
          } else {
            throw new Error(
              `Retried fetching ${fetchFailedRetries} times! Bailing!`
            );
          }
        } else {
          console.error("CLient Error", err);
          throw err;
        }
      });
  }
}
