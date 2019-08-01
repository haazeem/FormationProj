import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';

import { ContactComponent } from './components/contact/contact.component';
import { PricingComponent } from './components/pricing/pricing.component';

import { Page404Component } from './erros/page404/page404.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashbordUserComponent } from './components/dashbord-user/dashbord-user.component';
import { ConvertisseurComponent } from './components/dashbord-user/convertisseur/convertisseur.component';
import { PlatformComponent } from './components/dashbord-user/platform/platform.component';
import { UserfreeGuard } from './guards/userfree.guard';
import { Page401Component } from './erros/page401/page401.component';
import { Page403Component } from './erros/page403/page403.component';
import { UserpremiumGuard } from './guards/userpremium.guard';
import { AdminGuard } from './guards/admin.guard';
import { StatsConvertisseurComponent } from './components/dashbord-admin/stats/stats-convertisseur/stats-convertisseur.component';
import { StatsWsComponent } from './components/dashbord-admin/stats/stats-ws/stats-ws.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'Error401',
    component: Page401Component
  },
  {
    path: 'Error403',
    component: Page403Component
  },
  {
    path: 'dashboard',
    component: DashbordComponent,
    canActivate: [UserfreeGuard]
  },
  {
    path: 'dashboardAdmin',
    component: DashbordAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard-user',
    component: DashbordUserComponent,
    canActivate: [UserpremiumGuard]
  },
  {
    path: 'stats-conv',
    component: StatsConvertisseurComponent
  },
  {
    path: 'stats-ws',
    component: StatsWsComponent
  },
  {
    path: 'convertisseur',
    component: ConvertisseurComponent
  },
  {
    path: 'platform',
    component: PlatformComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register:/type',
    component: RegisterComponent
  },
  {
    path: 'register:/type',
    component: RegisterComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
