import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

   constructor(private http: HttpService) {}

  notes(data: any): Observable<any> {
    return this.http.postApi('/notes/addNotes', data, this.http.getHeaders());
  }
  getNotes() {
  return this.http.getApi('/notes/getNotesList', this.http.getHeaders()); 
  }
  changeNoteColor(noteId: string, color: string) {
  const url = '/notes/changesColorNotes';
  const payload = {
    color,
    noteIdList: [noteId]
  };
  return this.http.postApi(url, payload, this.http.getHeaders()); 
 }
// archiveNote(payload: any) {
//   return this.http.postApi('your_base_url/notes/archiveNotes',  {
//     headers: this.http.getHeaders()
//   });
  archiveNote(payload: { noteIdList: string[]; isArchived: boolean }) {
  return this.http.postApi('/notes/archiveNotes', payload, this.http.getHeaders());
}
updateNote(noteId: string, data: any) {
  return this.http.putApi(`/notes/${noteId}`, data);
}


}


