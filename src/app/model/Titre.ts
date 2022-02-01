export interface Titre {
  id?: string;
  title?: string;
  description?: string;
  album?: string;
  artist?: string;
  duration?: string;
  date?: string;
  styles?: string[];
  picture?: string | ArrayBuffer | null;
}
