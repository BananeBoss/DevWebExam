import {Component, OnInit} from '@angular/core';
import {ListMusicService} from "../partage/service/list-music.service";
import {Titre} from "../model/Titre";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss']
})
export class ListMusicComponent implements OnInit {

  titres: Titre[] = [];
  view:string = "card";
  dialogStatus: string = "inactive";
  private addDialog: MatDialogRef<AjoutPopupComponent> | any;

  constructor( private readonly listMusicService: ListMusicService, public dialog: MatDialog) {
    //Rien à faire ici
  }

  ngOnInit(): void {
    this.listMusicService.fetch().subscribe(music => {
      this.titres = music || [];
    });
  }

  delete(titre: Titre) {
    this.listMusicService.delete(titre.id!).subscribe(titre => {
      this.titres = titre;
    });
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

  add(titre: Titre) {
    this.listMusicService
      .create(titre)
      .pipe(mergeMap(() => this.listMusicService.fetch()))
      .subscribe(titre => {
        this.titres = titre;
        this.hideDialog();
      });
  }

  update(titre: Titre) {
    this.listMusicService
      .update(titre)
      .pipe(mergeMap(() => this.listMusicService.fetch()))
      .subscribe(titre => {
        this.titres = titre;
        this.hideDialog();
      });
  }

  showDialog() {
    debugger;
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((titre:any)=> {
      this.dialogStatus = 'inactive';
      if (titre) {
        this.add(titre);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if(this.addDialog != undefined){
      this.addDialog.close();
    }
  }
}
