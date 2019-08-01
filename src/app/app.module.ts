import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { ToastrModule } from 'ngx-toastr';
import { Page404Component } from './erros/page404/page404.component';
import { InputsModule, NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { DashbordUserComponent } from './components/dashbord-user/dashbord-user.component';
import { PlatformComponent } from './components/dashbord-user/platform/platform.component';
import { ConvertisseurComponent } from './components/dashbord-user/convertisseur/convertisseur.component';
import { Page401Component } from './erros/page401/page401.component';
import { Page403Component } from './erros/page403/page403.component';
import { StatsWsComponent } from './components/dashbord-admin/stats/stats-ws/stats-ws.component';
import { StatsConvertisseurComponent } from './components/dashbord-admin/stats/stats-convertisseur/stats-convertisseur.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PricingComponent,

    ContactComponent,
    DashbordComponent,
    DashbordAdminComponent,
    
    Page404Component,
    LoginComponent,
    RegisterComponent,
    DashbordUserComponent,
    PlatformComponent,
    ConvertisseurComponent,
    Page401Component,
    Page403Component,
    StatsWsComponent,
    StatsConvertisseurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    InputsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDI9GTi6HWiKI85AW9H4Q-0UBt-EeONE0A'
    }),
    ButtonsModule
  ],
  providers: [UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
