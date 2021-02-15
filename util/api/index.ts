// Talently tech test: ApiRequest Builder
// @Author: Catalina Fernandez
// @Username: KellySugarcoat
// @Description: Definition for ApiRequest Class.
// @Usage: Initialize this class and use its 'Get' and 'Post' methods to perform
//         requests already-configured to the API server
const TOKEN = window.localStorage.getItem('auth._token.local') || ""
export enum Endpoints{
    CONTENT = 'https://fchallenge.talently.tech/api/content/',
    COMMENT = 'https://fchallenge.talently.tech/api/comment/'
}

export class ApiRequest {
    url = ''
    method = 'POST'
    headers = new Headers()
    token = TOKEN
    DEFAULT_HEADERS = new Headers({
        "Content-Type": "application/json",
        "X-Custom-Header": "ProcessThisImmediately",
        "Authorization": TOKEN.toString()

    })


    constructor(url: string, headers?: Headers) {
        this.url = url;
        this.headers = headers || this.DEFAULT_HEADERS
    }


    private getOptions(body?: Object, method?: string): Object {
          return {
              method: method || this.method,
              body: body? JSON.stringify(body) : "",
              headers: this.headers,
              mode: 'cors',
              cache: 'default'
          }
    }

    private getContentLength(content: Object) {
        if (!content) return "0"
        return JSON.stringify(content).toString().length.toString()
    }


    public async post(endpoint: Endpoints | string, body: Object): Promise<Response | Error> {
        this.headers.set('Content-Length', this.getContentLength(body))

        let request = await fetch(this.url + endpoint, this.getOptions(body))
        let response = await request.json()

        //check for OK and return parsed response, otherwise, throw an error.
        if (request.ok) {
            return response
        }
        
        return new Error()
    }

    public async get(url: string = ""): Promise<Response | Error> {
        let request = await fetch(`${this.url}${url}`, this.getOptions())
        let response = await request.json()

        //check for OK and return parsed response, otherwise, throw an error.
        if (request.ok) {
            return response
        }
        
        return new Error()
    }

    public async delete(url: string = ""): Promise<Response | Error> {
        let request = await fetch(`${this.url}${url}`, this.getOptions(undefined, "DELETE"))
        let response = await request.json()

        //check for OK and return parsed response, otherwise, throw an error.
        if (request.ok) {
            return response
        }
        
        return new Error()
    }

}