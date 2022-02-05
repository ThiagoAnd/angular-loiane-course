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
//formData.append("Nome do atributo, geralmente file", blob(um arquivo), nome do arquivo do tipo file)
files.forEach(file => formData.append('file',file,file.name))
//Aqui é demonstrado como fazer um httpRequest na mão no angular
 // const request = new HttpRequest('POST',url,formData);
 // return this.http.request(request);
  //Aqui embaixo é a forma tradicional que fazemos
  //return this.http.post(url,formData);

  return this.http.post(url,formData,{
    //O angular vai reportar todos os eventos http que estão acontecendo
    observe: 'events',
    // Aqui nos vamos setar para ele reportar o evento de progresso, que é o type 1 que aparece em qualquer response
    reportProgress: true
  })

}

//O retorno de uma chamada normalmente é um json
//mas para download o response é um BLOB, ou seja, uma coleção de bytes, ja que vamos lidar com arquivo
download(url:string){
  return this.http.get(url,{
    //se quiser depois pra obter certas informações vc pode colocar um as 'json' , como aquela parte de fazer o download
    responseType: 'blob' as 'json'
    //reportProgress
    //O back end tem que setar o tamanho do arquivo, pois o angular só vai saber o tamanho do arquivo depois que fizer o download
    //o back tem que setar o header do content length e mandar, para podermos calcular e fazer o report progress
    //downloadProgress
  })
}

handleFile(res:any,filename:string){
   //criamos um arquivo e ja falamos qual é o tipo desse arquivo
  //browsers diferentes tem fluxos diferentes
  //ou mostra um popup perguntando pra salvar - internet explorer
  //ou mostra uma abinha e salva para a pasta default de download do pc
  const file = new Blob([res],{
    type: res.type
  });

  //INTERNET EXPLORER 11
  //aqui fazemos um cast no typescript para poder verificar o msSave, loiane não ensinou
  //esse msSave é aquele prompt para pedir pra salvar ou abrir
  //dessa forma a gente consegue ver se é internet explorere
  if(window.navigator && (window.navigator as any).msSaveOrOpenBlob){
    console.log("eh internet explorer");
    //por aqui ele ja faz o processo de download no IE e ja retorna para não avançar pra baixo
    (window.navigator as any).msSaveOrOpenBlob(file);
    return;
  }

  //CRIAMOS um link utilizando um objeto
  const blob = window.URL.createObjectURL(file);

  //aqui é uma gambierra comumente feita segundo a loiane
  const link = document.createElement('a');
  link.href = blob;
  //conseguimos dar o nome para o arquivo
  link.download = filename;
//nas versões atuais do firefox esse click não funciona, segundo a Loiane, apesar q eu testei e funcionou
  //link.click();

  link.dispatchEvent(new MouseEvent('click',{
    bubbles: true,
    cancelable: true, //se eu posso cancelar
    view: window //onde eu quero ver esse arquivo, na propria janela
  }))

  //aqui funciona para firefox e tambem os outros, o mais abaixo que não funciona para firefox segundo a loiane (n testei)
  //eu deixei comentado
  //No firefox, pra ser realmente removido o link abaixo, tem que ter pelo menos um delay, meio estranho
   setTimeout(()=> {
     window.URL.revokeObjectURL(blob);
     link.remove();
   },100);

  //aqui depois de baixado vamos remover esse arquivo
  //e depois nos vamos remover o link, assim se tivermos outro arquivo nos vamos criando
  //fazendo o download e removendo o link
  // window.URL.revokeObjectURL(blob);
  // link.remove();
}
}
