import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Titre } from "../../model/Titre";

@Component({
  selector: 'carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @Input() titre: Titre | undefined;

  @Output('personDelete') delete$: EventEmitter<any> = new EventEmitter();

  @Output('personUpdate') update$: EventEmitter<any> = new EventEmitter();


  constructor() {
    //Empty
  }

  delete() {
    this.delete$.emit(this.titre);
  }

  update() {
    this.update$.emit(this.titre);
  }

  parseDate(date?: string): String {
    //comprend pas pourquoi cela ne fonctionne pas sur les dates des exemples, mais fonctionne sur les date que je créé...
    return new Date(Date.parse("" + date)).toDateString();
  }
}

