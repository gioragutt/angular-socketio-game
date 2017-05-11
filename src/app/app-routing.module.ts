import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AioGameRunnerComponent } from './aio-game';

const routes: Routes = [
  {
    path: '', component: AioGameRunnerComponent
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
