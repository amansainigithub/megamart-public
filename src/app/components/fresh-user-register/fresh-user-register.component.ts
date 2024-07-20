import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fresh-user-register',
  templateUrl: './fresh-user-register.component.html',
  styleUrl: './fresh-user-register.component.css'
})
export class FreshUserRegisterComponent {

  setupPassForm: any = {
    password: null
  };

  receivedData:any;

  constructor(private route: ActivatedRoute,private rou: Router) {
    const state = history.state;

    // Example: Accessing state variables
    console.log(state.example);    // Output: '123'
  
  }

  ngOnInit() {
  }
  

  createAccount()
  {

  }

}
