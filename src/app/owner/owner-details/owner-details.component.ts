import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Owner } from 'src/app/_interface/owner.model';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  public owner: Owner;
  public showAccounts;

  constructor(private repository: RepositoryService, private router: Router,
              private activateRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  private getOwnerDetails = () => {
    const id = this.activateRoute.snapshot.params.id;
    const apiUrl = `api/owner/${id}/account`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.owner = res as Owner;
      },
      (error) => {
        this.errorHandler.handleError(error);
      });
  }

}
