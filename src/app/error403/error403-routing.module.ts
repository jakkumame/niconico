import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error403Page } from './error403.page';

const routes: Routes = [
  {
    path: '',
    component: Error403Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Error403PageRoutingModule {}
