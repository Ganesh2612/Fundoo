import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './Services/authGuard/auth-guard.service';
import { NotesComponent } from './pages/Components/notes/notes.component';
import { RemainderComponent } from './pages/Components/remainder/remainder.component';
import { EditLabelsComponent } from './pages/Components/edit-labels/edit-labels.component';
import { ArchiveComponent } from './pages/Components/archive/archive.component';
import { TrashComponent } from './pages/Components/trash/trash.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"signup", component:SignupComponent},
    {
    
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: NotesComponent },
      {
        path: 'reminders',
        component: RemainderComponent,
      },
      {
        path: 'edit-labels',
        component: EditLabelsComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'trash',
        component: TrashComponent,
      },
    ],
  },


]