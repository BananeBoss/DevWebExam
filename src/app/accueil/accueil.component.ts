import {Component} from '@angular/core';
import {Titre} from "../model/Titre";
import {ListMusicService} from "../partage/service/list-music.service";

@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  titre: Titre = {};


  constructor(private readonly listMusicService:ListMusicService) {
    this.random();
  }


  /**
   * Returns random people
   */
  random() {
    this.listMusicService.fetchRandom().subscribe(titre => {
      this.titre = titre;
    });
  }

  delete(titre: Titre){
    this.listMusicService.delete(titre.id!).subscribe(() => {
      this.random();
    });
  }



}
