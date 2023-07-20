import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHandlerService } from '../shared/service/login-http-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormObj: FormGroup | any;
  dataArray: any[] = [];
  position = "hod";

  constructor(private httpServe: HttpHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormObj = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    console.log(this.loginFormObj.value);

    this.httpServe.loginUser(this.loginFormObj.value).subscribe(
      (response: any) => {
        const registered = response.registered;

        if (registered) {
          const email = response.email;

          this.httpServe.getUsers().subscribe((responseData: any) => {
            this.dataArray = Object.values(responseData);
            console.log(this.dataArray);

            const user = this.dataArray.find((item: any) => item.email === email);

            if (user) {
              const userPosition = user.position;

              if (userPosition === 'hod') {
                this.router.navigate(['/hod-dashboard']);
              } else if (userPosition === 'staff') {
                this.router.navigate(['/staff-dashboard']);
              } else {
                console.log('Unknown user position');
              }
            } else {
              console.log('User not found');
            }
          });
        } else {
          console.log('Registration unsuccessful');
        }
      },
      (error: any) => {
        console.log('Authentication error:', error);
      }
    );

    this.loginFormObj.reset();
  }

}
