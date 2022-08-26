import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = this.urlService.getUrl('minesweeper-CBR-backend');

  asdf: any = [[0, 0],[0, 1],[0, 2],[0, 8],[0, 9], [1, 0]];

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
  ) { }

  private async post(
    path: string,
    obj: any,
    params: {} = {},
    options: any = {}
  ): Promise<any> {
    try {
      options.params = params;
      const call = (await this.http
        .post(this.api + path, obj, options)
        .toPromise()) as any;
      if (call.code == 401) {
        console.log("Code 400");
      } else {
        return call;
      }
    } catch (err: any) {
      if (err.status != 200) {
        console.log(err.status);
      }
    }
  }

  async getSolutionCall(pattern: string): Promise<any> {
    return this.post('getSolution?pattern=' + pattern, null);
  }
}
