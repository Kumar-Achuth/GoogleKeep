import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpService) { }
  // ****************************NoteLabels Services********************************* */
  getUpdatedLabel(id, body) {
    return this.http.postJSON('/noteLabels/' + id + '/updateNoteLabel', body)
  }
  getLabels() {
    return this.http.encodedGetForm('noteLabels/getNoteLabelList')
  }
  deleteLabel(id) {
    return this.http.deleteTheLabel('/noteLabels/' + id + '/deleteNoteLabel')
  }
  addLabel(body) {
    return this.http.postJSON('/noteLabels', body)
  }
  deleteChip(id, label, body) {
    return this.http.postJSON('notes/' + id + '/addLabelToNotes/' + label + '/remove', body)
  }
  goLabel(trashId, labelId, body) {
    return this.http.postJSON('notes/' + trashId + '/addLabelToNotes/' + labelId + '/add', body)
  }
  getindividualLabel(label) {
    return this.http.encodedPostForm('notes/getNotesListByLabel/' + label + '', {})
  }
  // ***************************Notes Services************************************* */
  postNotes(body) {
    return this.http.encodedPostForm('notes/addNotes', body)
  }
  postTrash(body) {
    return this.http.postJSON('notes/trashNotes', body)
  }
  getTrashNotes() {
    return this.http.encodedGetForm('notes/getTrashNotesList')
  }
  foreverTrash(body) {
    return this.http.postJSON('notes/deleteForeverNotes', body)
  }
  getNotes() {
    return this.http.encodedGetForm('notes/getNotesList')
  }
  noteUpdate(body) {
    return this.http.encodedPostForm('notes/updateNotes', body)
  }
  // **************************Archive NotesList Services***************************** /
  postArchive(body) {
    return this.http.postJSON('notes/archiveNotes', body)
  }
  getArchiveNotes() {
    return this.http.encodedGetForm('notes/getArchiveNotesList')
  }
  // ************************Reminder Services**************************************/
  reminder(body) {
    return this.http.postJSON('notes/addUpdateReminderNotes', body)
  }
  getReminder() {
    return this.http.getJSON('notes/getReminderNotesList/')
  }
  deleteReminder(body) {
    return this.http.postJSON('notes/removeReminderNotes', body)
  }
  // *******************CheckList Services********************************
  updateCheckList(dataId, checkListArrayId, body) {
    return this.http.postJSON("notes/" + dataId + "/checklist/" + checkListArrayId + "/update", body)
  }
  removeCheckList(dataId, removedListId, body) {
    return this.http.postJSON("notes/" + dataId + "/checklist/" + removedListId + "/remove", body)
  }
  addCheckList(dataId, body) {
    return this.http.postJSON("notes/" + dataId + "/checklist/add", body)
  }
  // ***********************Note Color Services**************************/
  postColor(body){
    return this.http.postJSON('/notes/changesColorNotes',body)
  }
  // ************************Pin Notes Services*****************************/
  pin(body){
    return this.http.postJSON('notes/pinUnpinNotes',body)
  }
  // *************************Collaborator Services**************************/
  postCollaborator(id,body){
    return this.http.postJSON('notes/'+ id+'/AddcollaboratorsNotes',body)
  }
 
}
