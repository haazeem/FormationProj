import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ConnexionForm: FormGroup;
  constructor(private admin: AdminService,private toastr: ToastrService ,private form: FormBuilder, private userService: UserService, private router: Router) {
    this.ConnexionForm = this.form.group({
      email: new FormControl("", [
        Validators.email,
        Validators.required
      ]

      ),
      motDePasse: new FormControl("", [
        Validators.required
      ]
      )
    });
  }
  get email() {
    return this.ConnexionForm.get('email');
  }
  get motDePasse() {
    return this.ConnexionForm.get('motDePasse');
  }
  ngOnInit() {
    let resfreeUser = (this.userService.isLoggedFreeUser());
    let resPremiumUser = this.userService.isLoggedPremiumUser();
    let resAdmin = this.admin.isLoggedAdmin();
    if (resfreeUser==true) {
      this.router.navigateByUrl("/dashboard");
    } else {
      if (resPremiumUser==true) {
        this.router.navigateByUrl("/dashboard-user");
      } else {
        if (resAdmin==true) {
          this.router.navigateByUrl("/dashboardAdmin");
        }
      }
    }

  }
  login() {
    let data = new User("", "", this.ConnexionForm.value.email, this.ConnexionForm.value.motDePasse, "");
    this.userService.userConnexion(data).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.toastr.success("loged in !")
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    });
  }
}
