import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogueService } from 'src/app/shared/confirm-dialogue.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Owner } from 'src/app/_interface/owner.model';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Owner>();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService,
              private router: Router, private dialogService: ConfirmDialogueService) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllOwners = () => {
    this.repoService.getData('api/owner')
    .subscribe(res => {
      this.dataSource.data = res as Owner[];
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  public redirectToDetails = (id: string) => {
    const url = `/owner/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    const url = `/owner/update/${id}`;
    console.log(url);
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {

  }

  public onDelete = (id: string) => {
    const apiUrl = `api/owner/${id}`;

    this.dialogService.openConfirmDialog('Are you sure to delete this record')
      .afterClosed().subscribe(res => {
        if (res) {
          this.repoService.delete(apiUrl)
          .subscribe(result => {
            this.refreshMatGrid();
          });
        }
      });

  }

  refreshMatGrid = () => {
    this.repoService.getData('api/owner')
    .subscribe(res => {
      this.dataSource.data = res as Owner[];
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

}

