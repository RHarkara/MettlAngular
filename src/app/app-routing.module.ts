import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import {AssessmentListComponent} from './components/assessment-list/assessment-list.component';
import {MettlAccountinfoComponent} from './components/mettl-accountinfo/mettl-accountinfo.component';
import {AllAssessmentsComponent} from './components/allassessments/allassessments.component';
import {CreatescheduleComponent} from './components/createschedule/createschedule.component';
import {CandidateTestStatusComponent} from './components/candidate-test-status/candidate-test-status.component';
import { LocalDataComponent } from './components/local-data/local-data.component';
import { AccessKeyDataComponent } from './components/access-key-data/access-key-data.component';


const routes: Routes = [
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'assessments', component: AssessmentListComponent },
  { path: 'accountInfo', component: MettlAccountinfoComponent },
  { path: 'allAssessments', component: AllAssessmentsComponent },
  { path: 'createScheduleAssessment', component: CreatescheduleComponent },
  { path: 'candidateTestStatus', component: CandidateTestStatusComponent },
  { path: 'createScheduleAssessment', component: CreatescheduleComponent },
  { path: 'localData', component: LocalDataComponent},
  { path: 'AccessKeyData', component: AccessKeyDataComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
