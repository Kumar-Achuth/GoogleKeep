/************************************************************************************************
*  Execution       : 1. default node         cmd> addNotes.ts 
*        
*  Purpose         : To Add Notes
* 
*  Description     : Add Notes Api and CheckList Apis
* 
*  @file           : addNotes.ts
*  @overview       : To Add Notes With reminders,colors,labels,checklist
*  @module         : addNotes.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/userServices/user.service';

@Component({
    selector: 'app-add-notes',
    templateUrl: './add-notes.component.html',
    styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    private image = localStorage.getItem('imageUrl')
    private img = environment.apiUrl + this.image;
    private email = localStorage.getItem('email');
    private firstName = localStorage.getItem('firstName');
    private lastName = localStorage.getItem('lastName')
    private userId = localStorage.getItem('userId');
    private hide: boolean = true;
    private labelId = [];
    private labelName = [];
    private body: any = {};
    private data: any;
    private show: any = 0;
    private color: any = "#fafafa";
    private listing = true;
    private i = 0;
    private dataArray = [];
    private dataArrayCheck = [];
    private checked = false;
    private status = "open";
    private dating;
    private labelArray: any[];
    private date;
    private collaboratorBody:any=[];
    private addCollaborator: any = 0;
    private today = new Date();
    private tomorrow = new Date(this.today.getFullYear(), this.today.getMonth()
        , this.today.getDate() + 1)
    private dateArray = [];
    private notes = { 'id': '' };
    private searchNames: any = [];
    private userList = [];
    private newList = [];
    private collaborator: any = [];
    @Output() newEvent = new EventEmitter();
    @Output() addNote = new EventEmitter();
    constructor(private noteService: NotesService, private userService: UserService,
        private snackBar: MatSnackBar, private router: Router) { }
    ngOnInit() {
        this.getAllLabels();
    }
    toggle() {
        this.show = 1;
    }
    toggleCollaborator() {
        this.addCollaborator = 1;
    }
    closecards() {
        this.addCollaborator = 0;
    }
    cancelCards(){
        this.addCollaborator = 0;
        this.collaborator=[];
    }
    cancelLabel() {
        this.labelName = [];
        this.labelId = [];
    }
    cancel() {
        this.dateArray = [];
        this.date = '';
    }
    /**
     * @description : Add Notes api Call starts
     */
    addNotes() {
        this.dating = '';
        if (this.date != undefined) {
            this.dating = this.date
        }
        if (this.checked == false) {
            this.noteService.postNotes({
                'title': document.getElementById('titleId').innerHTML,
                'description': document.getElementById('notesId').innerHTML,
                'labelIdList': JSON.stringify(this.labelId),
                'checklist': '',
                'isPined': 'false',
                'color': this.color,
                "reminder": this.dating,
                "collaberators":JSON.stringify(this.collaborator)
            }).pipe(takeUntil(this.destroy$))
                .subscribe(response => {
                    this.addNote.emit(response['status'].details)
                    this.labelName = [];
                    this.hide = !this.hide;
                    this.color = "#fafafa";
                    this.show = 0;
                    this.dating = '';
                    this.labelId = [];
                    this.dateArray = [];
                    this.date = '';
                    this.collaborator=[];
                    this.searchNames=[];
                }, error => {
                    this.color = "#fafafa";
                    this.hide = !this.hide;
                    this.labelName = [];
                    this.dating = '';
                    this.labelId = [];
                    this.dateArray = [];
                    this.show = 0;
                    this.date = '';
                    this.collaborator=[];
                    this.searchNames=[];
                })
        }
        /**
         * @description : Api call for Adding checklist 
         */
        else {
            for (var i = 0; i < this.dataArray.length; i++) {
                if (this.dataArray[i].isChecked == true) {
                    this.status = "close"
                }
                var apiObj = {
                    "itemName": this.dataArray[i].data,
                    "status": this.status
                }
                this.dataArrayCheck.push(apiObj)
                this.status = "open"
            }
            this.noteService.postNotes({
                'title': document.getElementById('titleId').innerHTML,
                'labelIdList': JSON.stringify(this.labelId),
                'checklist': JSON.stringify(this.dataArrayCheck),
                'isPined': 'false',
                'color': this.color,
                "reminder": this.dating,
                "collaberators":JSON.stringify(this.collaborator)
            }).pipe(takeUntil(this.destroy$))
                .subscribe(response => {
                    this.newEvent.emit({
                    })
                    this.dataArrayCheck = [];
                    this.labelName = [];
                    this.dataArray = [];
                    this.date = '';
                    this.hide = !this.hide;
                    this.color = "#fafafa";
                    this.show = 0;
                    this.dateArray = [];
                    this.collaborator=[];
                    this.searchNames=[];
                }, error => {
                    this.dataArrayCheck = [];
                    this.color = "#fafafa";
                    this.dataArray = [];
                    this.hide = !this.hide;
                    this.labelName = [];
                    this.show = 0;
                    this.date = '';
                    this.dateArray = [];
                    this.collaborator=[];
                    this.searchNames=[];
                })
        }
    }
    /**
     * @description changecolor event
     * @param event 
     */
    colorChanges(event) {
        this.color = event;
    }
    /**
     * @description keydown event
     * @param event 
     */
    onKeydown(event) {
        if (event.key === "Enter") {
        }
    }
    /**
     * @description Dislay label as chip in notecards
     * @param event 
     */
    instantLabel(event) {
        if (this.labelName.indexOf(event) < 0) {
            this.labelId.push(event.id);
            this.labelName.push(event);
        } else {
            this.labelId.splice(this.labelId.indexOf(event), 1)
            this.labelName.splice(this.labelName.indexOf(event), 1)
        }
    }
    /**
     * @description get all Labels inside the notecards
     */
    getAllLabels() {
        let newArray = [];
        this.noteService.getLabels()
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                for (var i = 0; i < data['data']['details'].length; i++) {
                    if (data['data']['details'][i].isDeleted == false) {
                        newArray.push(data['data']['details'][i])
                    }
                }
                this.labelArray = newArray;
            })
    }
    /**
     * @description Enter condition inside checklist
     */
    enter() {
        this.i++;
        if (this.data != null) {
            var obj = {
                "index": this.i,
                "data": this.data
            }
            this.dataArray.push(obj);
            this.data = null
        }
    }
    /**
     * @description : Click on delete function
     * @param deletedObj 
     */
    ondelete(deletedObj) {
        for (var i = 0; i < this.dataArray.length; i++) {
            if (deletedObj.index == this.dataArray[i].index) {
                this.dataArray.splice(i, 1);
                break;
            }
        }
    }
    /**
     * @description On enter and keydown for edit function
     * @param event 
     * @param edited 
     */
    editing(event, edited) {
        if (event.code == "Enter") {
            for (var i = 0; i < this.dataArray.length; i++) {
                if (edited.index == this.dataArray[i].index) {
                    this.dataArray[i].data == edited.data
                }
            }
        }
    }
    emitDate(event) {
        this.dateArray = [];
        this.date = event;
        this.dateArray.push(this.date)
    }
    /**
     * @description : To Delete The Added Collaborator 
     * @param item 
     */
    deleteCollaborator(item) {
        this.noteService.collaboratorDelete(this.data.id, item.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                for (let i = 0; i < this.collaborator.length; i++) {
                    if (item.userId == this.collaborator[i].userId) {
                        this.collaborator.splice(i, 1);
                    }
                }
            })
    }
    /**
     * @description Search User List Api Call
     */
    search() {
        this.userService.searchUserList({
            'searchWord': this.searchNames,
        })
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                this.userList = response['data']['details'];
            })
    }
    select(email) {
        this.searchNames = email;
    }
    enterNewLine(user) {
        for (let j = 0; j < this.collaborator.length; j++) {
            if (this.searchNames == this.collaborator[j].email) {
              this.snackBar.open("Collaborator already exists", "fail", {
                duration: 3000
              })
              this.searchNames = null;
              return false;
            }
          }
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].email == user) {
                this.collaborator.push(this.userList[i]);
            }
        }
        this.searchNames=[];
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }
}
