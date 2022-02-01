import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Titre} from "../../model/Titre";


@Injectable({
  providedIn: 'root'
})
export class ListMusicService {

  private musiques = new BehaviorSubject<string>('');

  private urlServer:any = {};

  constructor(private readonly http: HttpClient) {

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls

    Object.keys(environment.backend.endpoints).forEach(
      // @ts-ignore
      k => (this.urlServer[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
    console.log(this.urlServer);

  }

  get musiques$(): Observable<string> {
    return this.musiques.asObservable();
  }

  updatedMusiqueList(data: string){
    this.musiques.next(data);
  }

  fetch(): Observable<Titre[]> {
    return this.http.get<Titre[]>(this.urlServer.toutesLesMusiques);
  }

  search(name: string): Observable<Titre[]> {
    return this.http.get<Titre[]>(this.urlServer.filterByName.replace(':name', name));
  }

  fetchRandom(): Observable<Titre> {
    return this.http.get<Titre>(this.urlServer.musiqueAleatoire);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.urlServer.uneMusique.replace(':id', id));
  }

  create(music: Titre): Observable<Titre> {
    return this.http.post<Titre>(this.urlServer.toutesLesMusiques, music);
  }

  fetchOne(id: string): Observable<Titre> {
    return this.http.get<Titre>(this.urlServer.uneMusique.replace(':id', id));
  }

  update(music: Titre): Observable<Titre> {
    return this.http.put<Titre>(this.urlServer.uneMusique.replace(':id', music.id), music);
  }
}
