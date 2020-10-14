import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Owner } from 'src/app/_interface/owner.model';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {
  public owner: Owner;
  public ownerForm: FormGroup;
  private dialogConfig;

  constructor(private repository: RepositoryService, private activateRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService, private location: Location,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getOwnerById();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    };
  }

  private getOwnerById = () => {
    const id = this.activateRoute.snapshot.params.id;
    const apiUrl = `api/owner/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(response => {
        this.owner = response as Owner;
        this.ownerForm.patchValue(this.owner);
      },
      (error) => {
        this.errorHandler.handleError(error);
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public updateOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerUpdate = (ownerFormValue) => {
    this.owner.name = ownerFormValue.name;
    this.owner.dateOfBirth = ownerFormValue.dateOfBirth;
    this.owner.address = ownerFormValue.address;

    const apiUrl = `api/owner/${this.owner.id}`;
    this.repository.update(apiUrl, this.owner)
    .subscribe(res => {
      const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

      dialogRef.afterClosed()
      .subscribe(result => {
        this.location.back();
      });
    },
    (error) => {
      this.errorHandler.dialogConfig = { ...this.dialogConfig };
      this.errorHandler.handleError(error);
    });
  }



}
