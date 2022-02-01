import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListMusicService} from "../../partage/service/list-music.service";
import {Titre} from "../../model/Titre";

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  music: Titre;

  /**
   * Component constructor
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ListMusicService: ListMusicService
  ) {
    this.music = {};
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe(( music: any) => (this.music = music.music));
  }

  submit(music: any) {
    this.ListMusicService.update(music).subscribe(() => {
      this.router.navigate(['/listPersonnel']).then(r => null);
    });
  }

  cancel() {
    this.router.navigate(['/listPersonnel']).then(r => null);
  }

}
