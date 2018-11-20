import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
    selector: 'app-add-notes',
    templateUrl: './add-notes.component.html',
    styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
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
    private accessToken = localStorage.getItem('token');
    private labelArray: any[];
    private date;
    private today = new Date();
    private tomorrow = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()+1)
    private dateArray = [];
    private notes={'id':''}
    @Output() newEvent = new EventEmitter();
    @Output() addNote = new EventEmitter();
    constructor(private myHttpService: HttpService,private noteService:NotesService, private snackBar: MatSnackBar,
        private router: Router) { }
    ngOnInit() {
        this.getAllLabels();
    }
    toggle() {
        this.show = 1;
    }
    cancelLabel(){
        this.labelName=[];
        this.labelId=[];
    }
    cancel(){
        this.dateArray=[];
        this.date='';  
    }
    /**
     * @description : Add Notes api Call starts
     */
    addNotes() {
        this.dating='';
        if(this.date!=undefined){
            this.dating=this.date
        }
        if (this.checked == false) {
            this.noteService.postNotes({
                'title': document.getElementById('titleId').innerHTML,
                'description': document.getElementById('notesId').innerHTML,
                'labelIdList': JSON.stringify(this.labelId),
                'checklist': '',
                'isPined': 'false',
                'color': this.color,
                "reminder":this.dating
            }).subscribe(response => {
                this.addNote.emit(response['status'].details)
                this.labelName = [];
                this.hide = !this.hide;
                this.color = "#fafafa";
                this.show = 0;
                this.dating='';
                this.labelId=[];
                this.dateArray=[];
                this.date='';
            }, error => {
                this.color = "#fafafa";
                this.hide = !this.hide;
                this.labelName = [];
                this.dating='';
                this.labelId=[];
                this.dateArray=[];
                this.show = 0;
                this.date='';
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
                "reminder":this.dating
            }).subscribe(response => {
                this.newEvent.emit({
                })
                this.dataArrayCheck = [];
                this.labelName = [];
                this.dataArray=[];
                this.date='';
                this.hide = !this.hide;
                this.color = "#fafafa";
                this.show = 0;
                this.dateArray=[];
            }, error => {
                this.dataArrayCheck = [];
                this.color = "#fafafa";
                this.dataArray=[];
                this.hide = !this.hide;
                this.labelName = [];
                this.show = 0;
                this.date='';
                this.dateArray=[];
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
    emitDate(event){
        this.dateArray=[];
        this.date=event;
        this.dateArray.push(this.date)
    }
}
