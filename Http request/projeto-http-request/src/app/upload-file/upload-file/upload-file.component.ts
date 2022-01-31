import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  //Aqui criamos um set de arquivos, não é um array pq array aceita itens duplicados, e não queremos isso.
  files!: Set<File>;

  //essa variavel vai contabilizar o progresso
  progress = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    console.log(event);
    //esse diamond operator reflete uma interface, acho que é como se fosse um casting, procurar como usar ela, se seria como se fosse um cast
    const selectedFiles = <FileList>event.srcElement.files;
    //Aqui nos escolhemos a label no html e atualizamos com o nome que achamos do arquivo
    // document.getElementById('customFileLabel')!.innerHTML = selectedFiles[0].name;

    const fileNames: any[] = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    // cria um array e coloca os nomes dos arquivos que forem enviados, depois pega o inner html
    //da label e usa o join do javascript que transforma os elementos do array em uma unica string
    // separada por virgula e espaço
    document.getElementById('customFileLabel')!.innerHTML =
      fileNames.join(',  ');

            //aqui sempre quando formos colocar um novo arquivo zeramos o progresso
            this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      //Aqui substituimos o localhost por api, e ela é setada no arquivo proxy.config
      //nos vamos faazer assim pois desabilitamos o CORS na api node e jogamos essa configuração de acesso para esse arquivo de proxy
      this.service
        .upload(this.files, '/api/upload')
        //this.service.upload(this.files,'http://localhost:8000/upload')
        //Aqui nos tipamos o que recebemos no subscribe como event do tipo HttpEvent que vai ser Object
        //vai ser object pq as vezes pode ser um response, um header response, um progresso, etc
        //nos vamos tipar pq vai ser mais facil pegar o auto complete
        .subscribe((event: HttpEvent<Object>) => {
          //Aqui verificamos se o type for 4, sabemos que ele vai estar completo
          //Como sabemos isso? Fazendo um console.log do response(event), vai ter um campo chamado type dele
          if (event.type === HttpEventType.Response) {
            console.log('upload concluido');
            //Se for type 3,significa que estamos fazendo o upload, então vai ter uma porcentagem
          } else if (event?.type === HttpEventType.UploadProgress) {
           //Esses dois pipes || ali no total é o falback operator (logical operator), pq o event.total pode ser undefined
           //então caso for assim eu seto zero
           //Pelo que eu vi da pra usar o nullish coalescing operator
           const percentDone = Math.round((event.loaded * 100)/ (event.total || 1));
           console.log("Progresso: "+percentDone)
           //sempre que a gente fizer um progresso a gente seta o progresso
           this.progress = percentDone;
          }
        });
    }
  }
}
