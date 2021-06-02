import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import {AssessmentListComponent} from './components/assessment-list/assessment-list.component';
import {MettlAccountinfoComponent} from './components/mettl-accountinfo/mettl-accountinfo.component';

const routes: Routes = [
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'assessments', component: AssessmentListComponent },
  { path: 'accountInfo', component: MettlAccountinfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
