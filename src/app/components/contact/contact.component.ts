import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  longitude = 20.728218;
  latitude = 52.128973;
  contactForm: FormGroup;
  constructor(private form: FormBuilder, private user: UserService,private toast : ToastrService) {
    this.contactForm = this.form.group({
      name: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.email,
        Validators.required,
      ]),
      subject: new FormControl("", [
        Validators.required
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }
  get name() { return this.contactForm.get('name') }
  get email() { return this.contactForm.get('email') }
  get subject() { return this.contactForm.get('subject') }
  get description() { return this.contactForm.get('description') }


  ngOnInit() {
  }
  sendContact() {
    let data = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      description: this.contactForm.value.description,
    }
    this.user.contactAdd(data).subscribe((res) => {
      this.toast.info("Send it With succes , We will respond to you soon and thank you")
    }, (err) => {

    })
  }

}
