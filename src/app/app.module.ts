import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpService } from './services/http.service';
import { SlidePanelComponent } from './component/slide-panel/slide-panel.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import { AddReminderComponent } from './component/add-reminder/add-reminder.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ChangeColorComponent } from './component/change-color/change-color.component';
import { AddPhotoComponent } from './component/add-photo/add-photo.component';
import { AddArchiveComponent } from './component/add-archive/add-archive.component';
import { MoreComponent } from './component/more/more.component';
import { AddNotesComponent } from './component/add-notes/add-notes.component';
import { AuthService} from './component/auth.service';
import { AuthGuard} from './component/auth.guard';
import { NoteCardsComponent } from './component/note-cards/note-cards.component';
import { UpdateNotesComponent } from './component/update-notes/update-notes.component';
import { LabelsComponent } from './component/labels/labels.component';
import { NewlabelComponent } from './component/newlabel/newlabel.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LabelFilterPipe } from './pipes/label-filter.pipe';




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
  providers: [HttpService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
