import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerRoutingModule } from './owner-routing/owner-routing.module';
// import { MaterialModule } from '../material/material.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerDataComponent } from './owner-details/owner-data/owner-data.component';
import { AccountDataComponent } from './owner-details/account-data/account-data.component';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { SharedModule } from '../shared/shared.module';
import { OwnerUpdateComponent } from './owner-update/owner-update.component';


@NgModule({
  declarations: [
    OwnerListComponent,
    OwnerDetailsComponent,
    OwnerDataComponent,
    AccountDataComponent,
    OwnerCreateComponent,
    OwnerUpdateComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule
    // MaterialModule,
    // FlexLayoutModule
  ]
})
export class OwnerModule { }
