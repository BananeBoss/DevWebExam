import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ListMusicService} from "../service/list-music.service";
import {Titre} from "../../model/Titre";

@Injectable({
  providedIn: 'root'
})
export class EmployeDetailResolverResolver implements Resolve<Titre> {

  constructor(private readonly titreService: ListMusicService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Titre> {
    const employeId: string | null = route.paramMap.get('id');
    if(employeId != null){
      return this.titreService.fetchOne(employeId);
    }
    else
      return new Observable<Titre>();
  }
}
