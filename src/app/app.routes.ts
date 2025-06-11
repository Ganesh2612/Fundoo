import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './Services/authGuard/auth-guard.service';
import { NotesComponent } from './components/notes/notes.component';


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
},
      
    ],
  },


]