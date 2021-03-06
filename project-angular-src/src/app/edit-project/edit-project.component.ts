import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import project services
import { UserSessionService } from '../services/user-session.service';
import { ProjectService } from '../services/project.service';
// import project models
import { Project } from '../models/Project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  myProject: Project;
  userIsAuthorized: Boolean = false;
  formIsValid: Boolean = false;
  projectId: String = '';


  constructor(
    private userSessionService: UserSessionService,
    private projectService: ProjectService,
    private activeRoute: ActivatedRoute,
    private route: Router
    ) {
  }

  ngOnInit() {

    if (this.userSessionService.user.firstName !== 'Guest') {
      this.userIsAuthorized = true;
    }

    this.activeRoute.queryParams.subscribe(
      (params) => {
        this.projectId = params['id'];
      });

    this.projectService.getProjectById(this.projectId).subscribe(
      (response) => {
        this.myProject = response[0];
        this.myProject._id = this.projectId;
      },
      (error) => console.log(error)
    );

  }

   updateProject() {
    this.projectService.updateProject(this.myProject).subscribe (
      (response) => {
        this.myProject = response;
        this.route.navigate(['viewProject']);
      },
      (error) => {
        console.log(error);
      }
    );
   }

}
