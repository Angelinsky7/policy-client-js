export class HttpClient {
  public get<T>(url: string, args?: { [key: string]: string }): Promise<T> {
    return this.getRequest(url, args).then(p => {
      return Object.assign({} as T, JSON.parse(HttpClient.toLowerKey(p)));
    });
  }

  public getRequest(url: string, args?: { [key: string]: string }): Promise<any> {
    return new Promise<any>(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function() {
        reject(new Error('XMLHttpRequest Error: ' + this.statusText));
      };
      request.open('GET', url);
      if (args != null) {
        for (const arg in args) {
          request.setRequestHeader(arg, args[arg]);
        }
      }
      request.send();
    });
  }

  public static toLowerKey(json: string): string {
    return json.replace(/"([\w]+)":/g, function($0, $1) {
      return '"' + HttpClient.toFirstLowerCase($1) + '":';
    });
  }

  public static toFirstLowerCase(src: string): string {
    return src.charAt(0).toLowerCase() + src.slice(1);
  }
}
