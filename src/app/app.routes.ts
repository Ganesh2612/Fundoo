import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './Services/authGuard/auth-guard.service';
import { NotesComponent } from './components/notes/notes.component';

import { EditLabelsComponent } from './components/edit-labels/edit-labels.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemaindersComponent } from './components/remainders/remainders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { CombineNotesComponent } from './components/combine-notes/combine-notes.component';


export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"signup", component:SignupComponent},
    {
    
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: CombineNotesComponent },
      
      
     {
  path: 'archive',
  loadComponent: () =>
    import('./components/archive/archive.component').then(m => m.ArchiveComponent)
}, {
  path: 'trash',
  loadComponent: () =>
    import('./components/trash/trash.component').then(m => m.TrashComponent)
},
{path: 'remainders',
  loadComponent: () =>
    import('./components/remainders/remainders.component').then(m => m.RemaindersComponent)
},
{path: 'labels',
  loadComponent: () =>
    import('./components/edit-labels/edit-labels.component').then(m => m.EditLabelsComponent)
},
      
    ],
  },


]