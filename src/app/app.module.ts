import { BrowserModule } from '@angular/platform-browser';

import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler
} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthService } from './core/services/authGuard/auth.service';
import { AuthGuard } from './core/services/authGuard/auth.guard';
import { NoteCardsComponent } from './component/note-cards/note-cards.component';
import { UpdateNotesComponent } from './component/update-notes/update-notes.component';
import { LabelsComponent } from './component/labels/labels.component';
import { NewlabelComponent } from './component/newlabel/newlabel.component';
import { DeleteLabelComponent } from './component/delete-label/delete-label.component';
import { DeleteTrashComponent } from './component/delete-trash/delete-trash.component';
import { LabelFilterPipe } from '../app/core/pipes/label-filter.pipe';
import { GlobalSearchComponent } from './component/global-search/global-search.component';
import { LoggerService } from './core/services/loggerService/logger.service';
import { CropImageComponent } from './component/crop-image/crop-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { MessagingService } from './core/services/messageService/messaging.service';

import {
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatNativeDateModule,
  MatChipsModule,
  MatCheckboxModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule,
  MatStepperModule,
  MatSidenavModule,
  MatMenuModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

import { PinComponent } from './component/pin/pin.component';

import { InterceptService} from './core/services/interceptor/interceptor.service';
import { CollaboratorPageComponent } from './component/collaborator-page/collaborator-page.component';
import { ErrorsHandler } from './core/services/errorHandler/error-handler';
import { AskQuestionComponent } from './component/ask-question/ask-question.component';
import { BarRatingModule } from "ngx-bar-rating";
import { ECartComponent } from './component/e-cart/e-cart.component';

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
    CropImageComponent,
    DeleteLabelComponent,
    DeleteTrashComponent,
    PinComponent,
    CollaboratorPageComponent,
    AskQuestionComponent,
    ECartComponent,
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
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    MatSnackBarModule,
    MatSidenavModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
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
    MatCheckboxModule,
    ImageCropperModule,
    MatDialogModule,
    BarRatingModule


  ],
  providers: [HttpService, AuthService, AuthGuard, MessagingService, LoggerService,InterceptService,{
    provide: HTTP_INTERCEPTORS,
        useClass: InterceptService,
        multi: true
  },
  {
    provide: ErrorHandler,
    useClass: ErrorsHandler,
  }],
  bootstrap: [AppComponent],
  entryComponents: [DeleteLabelComponent, DeleteTrashComponent, CropImageComponent,
    CollaboratorPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
