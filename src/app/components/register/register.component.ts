import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  subscribeForm: FormGroup;
  creditCardform: FormGroup
  isPremium;
  isLogged = false;
  constructor(private formcreditCard: FormBuilder, private fb: FormBuilder, private router: ActivatedRoute, private rout: Router, private userService: UserService) {
    this.subscribeForm = fb.group(
      {
        nom: new FormControl("", [
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z]+")
        ]),
        prenom: new FormControl("", [
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z]+")
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.minLength(8),
          Validators.pattern("[a-zA-Z][a-zA-Z]+@[a-zA-Z][a-zA-Z][a-zA-Z]+[.][a-zA-Z][a-zA-Z][a-zA-Z]+")
        ]
        ),
        motDePasse: new FormControl("", [
          Validators.required,
          Validators.minLength(8)
        ]),
        repMotDePasse: new FormControl("", [
          Validators.required
        ])
      }
    );
    this.creditCardform = formcreditCard.group({
      name: new FormControl("", [
        Validators.minLength(2),
        Validators.required
      ]),
      creditcardNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")
      ]),
      cvvNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9][0-9][0-9]")
      ]),
      monthExpr: new FormControl("", [
        Validators.max(12),
        Validators.min(1),
        Validators.required
      ]),
      yearExpr: new FormControl("", [
        Validators.required,
        Validators.min(new Date().getFullYear()),
        Validators.max(9999)
      ])
    })
  }
  get nom() {
    return this.subscribeForm.get('nom');
  }
  get prenom() {
    return this.subscribeForm.get('prenom');
  }
  get email() {
    return this.subscribeForm.get('email');
  }
  get motDePasse() {
    return this.subscribeForm.get('motDePasse');
  }
  get repMotDePasse() {
    return this.subscribeForm.get('repMotDePasse');
  }
  /* Form credit card */
  get name() {
    return this.creditCardform.get('name');
  }
  get creditcardNumber() {
    return this.creditCardform.get('creditcardNumber');
  }
  get cvvNumber() {
    return this.creditCardform.get('cvvNumber');
  }
  get monthExpr() {
    return this.creditCardform.get('monthExpr');
  }
  get yearExpr() {
    return this.creditCardform.get('yearExpr');
  }
  ngOnInit() {
    this.isPremium = this.router.snapshot.queryParamMap.get('type');
    console.log(this.isPremium);
    if (localStorage.getItem('token')!=null) {
      this.isLogged = true;
      console.log(this.isLogged)
    }
    if (this.router.snapshot.queryParamMap.get('type') === null) {
      this.rout.navigateByUrl("/**");
    }
  }

  Inscription() {
    if (this.isPremium !== "premium") {
      let Data = (this.subscribeForm.value)
      let data = new User(Data.nom, Data.prenom, Data.email, Data.motDePasse, this.router.snapshot.queryParamMap.get('type'))
      this.userService.userInscription(data).subscribe((res) => {
      }, (err) => {

      });
    }
  }
  saveInfo() {

    let Data = (this.subscribeForm.value)
    let dataUser = new User(Data.nom, Data.prenom, Data.email, Data.motDePasse, this.router.snapshot.queryParamMap.get('type'))
    this.userService.userInscription(dataUser).subscribe((res) => {
      let _id = res._id;
      let data = {
        name: this.creditCardform.value.name,
        creditnumber: this.creditCardform.value.creditcardNumber,
        cvvNumber: this.creditCardform.value.cvvNumber,
        monthExpr: this.creditCardform.value.monthExpr,
        yearExpr: this.creditCardform.value.yearExpr,
        idUser: _id
      }
      this.userService.addCreditInfo(data).subscribe((result) => {
        console.log(res)
      }, (error) => {

      })
    }, (err) => {

    });

  }
}
