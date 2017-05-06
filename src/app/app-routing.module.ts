import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AioGameComponent } from './aio-game';

const routes: Routes = [
  {
    path: '', // component: AioGameComponent,
    children: []
  },
  {
    path: '**', pathMatch: 'full', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
