import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.scss']
})
export class DashbordUserComponent implements OnInit {
  restRequests;
  totalRequest;
  secretkey;
  userName;
  data = [];
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.infoUser().subscribe((res) => {
      this.restRequests = res['restReq'];
      this.secretkey = res['secretkey'];
      this.totalRequest = res['nbrReq'];
      console.log(res)
      this.userName = res['nom'] + " " + res['prenom'];
      this.data = res['logs'];
      console.log(res)

    }, (err) => {

    })

  }
  deconnexion() {
    this.user.userDeconnexion().subscribe((res) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl("/home");
    }, (err) => {

    })

  }
}
