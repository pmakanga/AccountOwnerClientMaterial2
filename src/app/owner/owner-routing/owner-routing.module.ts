import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OwnerListComponent } from '../owner-list/owner-list.component';
import { OwnerDetailsComponent } from '../owner-details/owner-details.component';
import { OwnerCreateComponent } from '../owner-create/owner-create.component';
import { OwnerUpdateComponent } from '../owner-update/owner-update.component';

const routes: Routes = [
  { path: 'owners', component: OwnerListComponent },
  { path: 'details/:id', component: OwnerDetailsComponent},
  { path: 'create', component: OwnerCreateComponent },
  { path: 'update/:id', component: OwnerUpdateComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OwnerRoutingModule { }
