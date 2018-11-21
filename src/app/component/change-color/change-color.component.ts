import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit ,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private accessToken = localStorage.getItem('token');
  private colorArray = [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  @Input() color;
  @Output() colorEmit = new EventEmitter();
  @Output() changeColor = new EventEmitter();
  constructor(private notesService: NotesService) { }
  ngOnInit() {
  }
  /**
   * @description Color Change Api Call fro Notes 
   * @param id
   */
  colorsEdit(id) {
    this.colorEmit.emit(id)
    if (this.color != undefined) {
      this.notesService.postColor({
          "color": id,
          "noteIdList": [this.color.id]
        }).pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            localStorage.setItem('colorId', this.color.id);
            this.changeColor.emit({
            })
          },
          error => {
          })
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
}
}
