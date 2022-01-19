import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

constructor(private http: HttpClient) { }

upload(files: Set<File>, url: string){
//No caso de upload de arquivos não enviamos json, enviamos arquivos
const formData = new FormData();
//Aqui nesse metodo nos jogamos um set de arquivos, mas se vc
//for passar o formulario.value vc vai fazer a iteração do form.value
//e fazer um apend no formData, do jeito que é feito com os arquivos aqui abaixo
files.forEach(file => formData.append('file',file,file.name))
//Aqui é demonstrado como fazer um httpRequest na mão no angular
  const request = new HttpRequest('POST',url,formData);
  return this.http.request(request);

  //Aqui embaixo é a forma tradicional que fazemos
  //return this.http.post(url,formData);
}
}
