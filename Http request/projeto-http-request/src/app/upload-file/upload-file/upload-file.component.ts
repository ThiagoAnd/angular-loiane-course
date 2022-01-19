import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  //Aqui criamos um set de arquivos, não é um array pq array aceita itens duplicados, e não queremos isso.
  files!:Set<File>;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any){
    console.log(event)
    //esse diamond operator reflete uma interface, acho que é como se fosse um casting, procurar como usar ela, se seria como se fosse um cast
    const selectedFiles = <FileList> event.srcElement.files;
    //Aqui nos escolhemos a label no html e atualizamos com o nome que achamos do arquivo
   // document.getElementById('customFileLabel')!.innerHTML = selectedFiles[0].name;

   const fileNames: any[] = [];
   this.files = new Set();
   for(let i = 0; i< selectedFiles.length; i++){
     fileNames.push(selectedFiles[i].name)
     this.files.add(selectedFiles[i])
   }
   // cria um array e coloca os nomes dos arquivos que forem enviados, depois pega o inner html
   //da label e usa o join do javascript que transforma os elementos do array em uma unica string
   // separada por virgula e espaço
   document.getElementById('customFileLabel')!.innerHTML = fileNames.join(',  ')
  }

  onUpload(){
    if (this.files && this.files.size > 0){
      this.service.upload(this.files,'http://localhost:8000/upload')
      .subscribe(
        response => console.log('upload concluido')
      );
    }
  }

}
