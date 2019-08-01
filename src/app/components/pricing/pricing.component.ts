import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  isLoggedFreeUser: boolean;
  isLoggedPremium: boolean;
  constructor(private us: UserService) { }

  ngOnInit() {
    if (this.us.isLoggedFreeUser()==true) {
      this.isLoggedFreeUser = true;
    } else {
      this.isLoggedFreeUser = false;
    }
    console.log(this.us.isLoggedPremiumUser())
    if (this.us.isLoggedPremiumUser()==true) {
      this.isLoggedPremium = true;
    } else {
      this.isLoggedPremium=false;
    }
    console.log(this.isLoggedFreeUser);
    console.log(this.isLoggedPremium);
    

  }

}
