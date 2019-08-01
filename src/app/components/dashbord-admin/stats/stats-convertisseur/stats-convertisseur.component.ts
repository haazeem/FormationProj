import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats-convertisseur',
  templateUrl: './stats-convertisseur.component.html',
  styleUrls: ['./stats-convertisseur.component.scss']
})
export class StatsConvertisseurComponent implements OnInit {
  data = [];
  dataLabels = [];
  isitNull = true;
  constructor(private admin: AdminService, private router : Router,@Inject(DOCUMENT) document) { }

  ngOnInit() {

    this.admin.statsConv().subscribe((res) => {
      // console.log(res)
      for (let i in res) {
        this.data.push(res[i]);
      }

      this.admin.morestatsConv().subscribe((result) => {
        let dataLabels;
        dataLabels = (result);

        for (let i = 0; i < 12; i++) {
          this.dataLabels.push(dataLabels[i])
          if (dataLabels[i] != 0) {
            this.isitNull = false;
          }
        }
        console.log(this.dataLabels)

        // Bar Chart Example
        var ctx = document.getElementById("myBarChart");
        var myBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
              label: "Requests",
              backgroundColor: "#4e73df",
              hoverBackgroundColor: "#2e59d9",
              borderColor: "#4e73df",
              data: this.dataLabels
            }],
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
              }
            },
            scales: {
              xAxes: [{
                time: {
                  unit: 'month'
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  maxTicksLimit: 12
                },
                maxBarThickness: 25,
              }],
              yAxes: [{
                ticks: {
                  padding: 10,
                  // Include a dollar sign in the ticks

                },
                gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
                }
              }],
            },
            legend: {
              display: false
            },
            tooltips: {
              titleMarginBottom: 10,
              titleFontColor: '#6e707e',
              titleFontSize: 14,
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
              callbacks: {
                label: function (tooltipItem, chart) {
                  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel + ": " + dataLabels[tooltipItem.index];
                }
              }
            },
          }
        });
      })
    }, (err) => {

    })

  }
  deconnexion() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/home");
  }

}
