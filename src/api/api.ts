type Options = {
    query?: object,
    signal?: AbortSignal;
    timeout?: number;
};

function checkForError (response: Response) {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  }

export class Api {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    get<Response>(url: string, options?: Options): Promise<Response> {
        return this.request<Response>(url, "GET", {...options, data: null});
    }

    post<Response, Data extends object | string>(url: string, data: Data, options?: Options): Promise<Response> {
        return this.request<Response, Data>(url, "POST", {...options, data});
    }

    patch<Response, Data extends object>(url: string, data: Data, options?: Options): Promise<Response> {
        return this.request<Response, Data>(url, "PATCH", {...options, data});
    }

    put<Response, Data extends object>(url: string, data: Data, options?: Options): Promise<Response> {
        return this.request<Response, Data>(url, "PUT", {...options, data});
    }

    delete<Response, Data extends object>(url: string, data?: Data, options?: Options): Promise<Response> {
        return this.request<Response>(url, "DELETE", {...options, data: data ?? {}});
    }

    private async request<Response, Data extends object | string = Record<string, never>>(
        url: string,
        method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
        options: Options & { data: Data | null }
    ): Promise<Response> {
            let params = "";
            if(options.query) params = "?" + new URLSearchParams(Object.entries(options.query)).toString();
            const reqURL = (new URL(url, this.baseURL)).href;
            const opts = options.data ?
            {
                method,
                body: JSON.stringify(options.data),
                signal: options.signal
            }
            :
            {
                method,
                signal: options.signal
            }
            const response = await fetch(`${reqURL}${params}`, opts)
                .then(checkForError)
                
            return response;
    }
}

const api = new Api("http://95.131.148.179:8080");

export default api;