import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  loader = true;
  data = [];
  total;
  totalStorage;
  src = [];
  dataDeleted = [];
  userName;
  constructor(private router: Router, private us: UserService) { }

  ngOnInit() {
    this.us.listeFiles().subscribe((res) => {
      this.us.infoUser().subscribe((result) => {
        this.userName = result['nom'] + " " + result['prenom'];
        this.total = res['total'];
        this.totalStorage = res['totalSize'];
        for (let i in res['data']) {
          this.data.push(res['data'][i]);
          this.src.push("http://localhost:3200/user/streamwav/?auth=" + localStorage.getItem('token') + "&file=" + res['data'][i].path);
        }
        this.loader = false;
      }, (error) => {

      })

    }, (err) => {

    })
  }
  deconnexion() {
    this.us.userDeconnexion().subscribe((res) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl("/home");
    }, (err) => {

    })

  }
  listen(i) {
    console.log(i.path)
    this.us.streamer(i.path);
  }
  show(event) {
    if (event.checked) {
      this.dataDeleted.push(event.element.value)
    } else {
      this.dataDeleted.splice(this.dataDeleted.indexOf(event.element.value), 1);
    }
  }
  deleteFiles() {
    this.us.deleteFiles(this.dataDeleted).subscribe((res) => {
      console.log(res)
      

    }, (err) => {

    })
  }
}
