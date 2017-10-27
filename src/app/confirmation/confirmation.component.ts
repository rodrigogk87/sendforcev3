import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class confirmationComponent implements OnInit {

  public confirmation_token: string;
  
  constructor( private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {
	   this.route.queryParams.subscribe(params => {
		   if (params.confirmation_token != null) {
			    this.confirmation_token=params.confirmation_token;
				this.userService.confirmEmail(this.confirmation_token).subscribe(
					response => {
						console.log(response);
					},
					error => {
						console.log(error);
					}
				);   
		   }
		});
	  /**/
  }

}
