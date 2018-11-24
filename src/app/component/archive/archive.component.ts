/************************************************************************************************
*  Execution       : 1. default node         cmd> archive.ts 
*        
*  Purpose         : To Get Archive Notes
* 
*  @file           : archive.ts
*  @description    : Get Archive Notes Api
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  private  unPin : any=[];
  constructor(private notesService: NotesService) { }
  ngOnInit() {
    this.getunPinnedArchiveNotes();
  }
  /**
   * @description Get Archived Notes Api
   */
  getunPinnedArchiveNotes() {
    this.notesService.getArchiveNotes().subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          if(data["data"]['data'][i].isPined == false &&
          data["data"]['data'][i].isDeleted == false ){
            this.unPin = (data["data"]['data']);
          }
        }
      }, error => {
      })
  }
  
}
