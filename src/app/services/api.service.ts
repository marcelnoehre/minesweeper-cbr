import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Case } from '../interfaces/case';
import { Solution } from '../interfaces/solution';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = this.urlService.getUrl('minesweeper-CBR-backend');

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
      if (call.code == 400) {
        console.error('Bad request!');
      } else if(call.code == 0) {
        console.log('jk');
      } else {
        return call;
      }
    } catch (err: any) {
      throw(err);
    }
  }

  async getSolutionCall(pattern: string): Promise<any> {
    return this.post('getSolution?pattern=' + pattern, null);
  }

  async addCaseCall(caseCollection: Solution[]) {
    for(let i = 0; i < caseCollection.length; i++) {
      await this.post('addCase?pattern=' + caseCollection[i].pattern + '&solvability=' + caseCollection[i].solvability + '&solutionCells=' + caseCollection[i].solutionCells + '&solutionTypes=' + caseCollection[i].solutionTypes, null);
    }
  }

  async removeCaseCall(pattern: string) {
    await this.post('removeCase?pattern='+pattern, null);
  }

  async updateCaseCall(newCase: Solution) {
    await this.post('addCase?pattern=' + newCase.pattern + '&solvability=' + newCase.solvability + '&solutionCells=' + newCase.solutionCells + '&solutionTypes=' + newCase.solutionTypes, null);
  }
}
