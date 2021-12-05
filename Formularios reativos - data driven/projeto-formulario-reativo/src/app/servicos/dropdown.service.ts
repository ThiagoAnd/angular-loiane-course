import { EstadoBr } from './../models/estado-br';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(

 // {providedIn: 'root'}
)
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }
}
