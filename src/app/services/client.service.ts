import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }


  async create(clientInfo: any): Promise<any> {
    return await this.httpClient.post('/api/client', clientInfo).toPromise();
  }
}
