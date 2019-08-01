import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  restRequests;
  totalRequest;
  secretkey;
  userName;
  data = [];
  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    this.user.infoUser().subscribe((res) => {
      this.restRequests = res['restReq'];
      this.secretkey = res['secretkey'];
      this.totalRequest = res['nbrReq'];
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
