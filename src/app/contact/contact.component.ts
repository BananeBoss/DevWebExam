import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {


  @ViewChild("nom") nom: ElementRef<HTMLElement> | undefined;
  @ViewChild("prenom") prenom: ElementRef<HTMLElement> | undefined;

  constructor() {
    //Vide

  }

  ngAfterViewInit(): void {
    this.nom!.nativeElement!.innerHTML = "Conicella";
    this.prenom!.nativeElement!.innerHTML = "Johann";
    //Vide
    }

}
