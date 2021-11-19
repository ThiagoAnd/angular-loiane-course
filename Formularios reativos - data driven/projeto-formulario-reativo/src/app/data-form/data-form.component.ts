import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  //Variavel que representa o nosso formulario
  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
