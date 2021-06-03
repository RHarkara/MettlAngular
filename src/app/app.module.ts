import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import {AssessmentListComponent} from './components/assessment-list/assessment-list.component';
import { MettlAccountinfoComponent } from './components/mettl-accountinfo/mettl-accountinfo.component';
import { AllassessmentsComponent } from './components/allassessments/allassessments.component';
import { CreatescheduleComponent } from './components/createschedule/createschedule.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    AssessmentListComponent,
    MettlAccountinfoComponent,
    AllassessmentsComponent,
    CreatescheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
