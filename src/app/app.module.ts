import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpService } from './core/services/httpServices/http.service';
import { SlidePanelComponent } from './component/slide-panel/slide-panel.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { AddReminderComponent } from './component/add-reminder/add-reminder.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ChangeColorComponent } from './component/change-color/change-color.component';
import { AddPhotoComponent } from './component/add-photo/add-photo.component';
import { AddArchiveComponent } from './component/add-archive/add-archive.component';
import { MoreComponent } from './component/more/more.component';
import { AddNotesComponent } from './component/add-notes/add-notes.component';
import { AuthService} from './core/services/authGuard/auth.service';
import { AuthGuard} from './core/services/authGuard/auth.guard';
import { NoteCardsComponent } from './component/note-cards/note-cards.component';
import { UpdateNotesComponent } from './component/update-notes/update-notes.component';
import { LabelsComponent } from './component/labels/labels.component';
import { NewlabelComponent } from './component/newlabel/newlabel.component';
import { LabelFilterPipe } from '../app/core/pipes/label-filter.pipe';
import { GlobalSearchComponent } from './component/global-search/global-search.component';
import { LoggerService} from './core/services/loggerService/logger.service';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';


import {
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatNativeDateModule, MatChipsModule, MatCheckboxModule, MatSelectModule, MatToolbarModule,
  MatButtonModule, MatIconModule, MatCardModule, MatRadioModule, MatStepperModule,
  MatSidenavModule, MatMenuModule, MatExpansionModule, MatTooltipModule, MatDatepickerModule,
  MatInputModule, MatFormFieldModule,MatSnackBarModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SlidePanelComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    NavbarComponent,
    NotesComponent,
    ReminderComponent,
    ArchiveComponent,
    TrashComponent,
    AddReminderComponent,
    CollaboratorComponent,
    ChangeColorComponent,
    AddPhotoComponent,
    AddArchiveComponent,
    MoreComponent,
    AddNotesComponent,
    NoteCardsComponent,
    UpdateNotesComponent,
    LabelsComponent,
    NewlabelComponent,
    LabelFilterPipe,
    GlobalSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCardModule,
    MatRadioModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule ,
    HttpClientInMemoryWebApiModule,
    MatSnackBarModule,
    MatSidenavModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    LayoutModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule



  ],
  providers: [HttpService, AuthService, AuthGuard, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
