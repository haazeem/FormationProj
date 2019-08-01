import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Chart } from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.scss']
})
export class DashbordAdminComponent implements OnInit {
  data;
  totalUsers;
  totaearning;
  totalReq;
  req;
  constructor(private us: AdminService, private router : Router,@Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.us.statUser().subscribe((result) => {
      this.data = (result['data']);
      this.totalUsers = result['total'];

      console.log(result)
      this.totaearning = result['totalearning']
      this.us.statsRequest().subscribe((res) => {
        let newData = [];
        newData.push(res['totalRequestPremium']);
        newData.push(res['totalRequestFree']);
        this.req = newData;
        this.totalReq = res['totalRequestFree'] + res['totalRequestPremium'];
        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ["Convertisseur", "WS"],
            datasets: [{
              data: newData,
              backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
              hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
          },
          options: {
            maintainAspectRatio: false,
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
            },
            legend: {
              display: false
            },
            cutoutPercentage: 80,
          },
        });
      }, (err) => {

      })


    }, (err) => {

    })





  }

  Generate() {
    let type = "dashbord";

    this.us.generateRapport(type, this.data, this.req, this.totalReq, this.totaearning, this.totalUsers).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  deconnexion() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/home");
  }
}
