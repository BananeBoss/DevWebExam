import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Titre } from "../../model/Titre";

@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  form: FormGroup;
  @Input() titreModel: Titre;
  @ViewChild("fileInput") fileInput!: ElementRef;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.titreModel = {
      //Titre: []
    };
  }

  ngOnInit() {
    debugger;
    this.form.patchValue({
      id: this.titreModel.id,
      title: this.titreModel.title,
      description: this.titreModel.description,
      album: this.titreModel.album,
      artist: this.titreModel.artist,
      duration: this.titreModel.duration,
      date: this.titreModel.date,
      picture: this.titreModel.picture,
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(titre: Titre) { //Formulaire
    titre.picture = this.titreModel.picture;
    this.submitEvent$.emit(titre);
  }

  addChipset(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.titreModel.styles!.push(value);
    }
    event.chipInput!.clear();
  }

  removeChipset(titre: any): void {
    const index = this.titreModel.styles!.indexOf(titre);
    this.titreModel.styles!.splice(index, 1);
  }

  onFileSelected(event: Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file: File | null = files!.item(0);

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.titreModel.picture = reader.result;
      }
    }
  }
  /**
   * Fonction pour construire notre formulaire
   * @returns {FormGroup}
   *
   * @private
   */
  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      album: new FormControl('', Validators.required),
      artist: new FormControl('', Validators.required),
      description: new FormControl(''),
      duration: new FormControl('', Validators.required),
      styles: new FormControl(''),
      date: new FormControl('', Validators.required),
      picture: new FormControl(''),
    });
  }



}
