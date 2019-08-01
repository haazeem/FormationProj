import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrls: ['./convertisseur.component.scss']
})
export class ConvertisseurComponent implements OnInit {
  convertForm: FormGroup;
  data = [];
  total;
  succes=false;
  userName;
  fileToUpload: File = null;
  constructor(private form: FormBuilder, private toast: ToastrService, private us: UserService, private router: Router) {
    this.convertForm = this.form.group({
      file: new FormControl("", [
        Validators.required
      ]),
      lang: new FormControl("", [
        Validators.required
      ])
    })
  }
  get file() { return this.convertForm.get('file') }
  get isPdf() { return ((this.convertForm.value.file + "").lastIndexOf(".pdf") != -1) ? true : false; };
  get isSelected() { return (this.convertForm.value.lang === "French" || this.convertForm.value.lang === "English") ? true : false };
  ngOnInit() {
    this.us.infoConvert().subscribe((res) => {
      this.us.infoUser().subscribe((result) => {
        this.userName = result['nom'] + " " + result['prenom'];
        this.total = res['total'];
        for (let i in res['logs']) {
          this.data.push(res['logs'][i]);
        }
        
      }, (error) => {
        
      })

    }, (err) => {

    })
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  convertFile() {
    let data = { lang: this.convertForm.value.lang }
    let form = new FormData();
    form.append("file", this.fileToUpload, this.fileToUpload.name);
    console.log(form.get("file"));
    this.us.convFile(data, form).subscribe((res) => {
      this.toast.success("Added success")
      console.log(res)
    }, (err) => {
      this.toast.error(err.error.mesg);
    });

  }
  deconnexion() {
    this.us.userDeconnexion().subscribe((res) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl("/home");
    }, (err) => {

    })

  }
}
