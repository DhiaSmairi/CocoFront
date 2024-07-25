import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './dashboard-user/maps/maps.component';
import { AddCollocationComponent } from './dashboard-user/add-collocation/add-collocation.component';
import { RegisterComponent } from './register/register.component';
import { AddCovoiturageComponent } from './dashboard-user/add-covoiturage/add-covoiturage.component';
import { ListCovoiturageComponent } from './dashboard-user/list-covoiturage/list-covoiturage.component';
import { ListannonceuserComponent } from './dashboard-user/listannonceuser/listannonceuser.component';
import { ListCollocationComponent } from './dashboard-user/list-collocation/list-collocation.component';
import { UpdateCollocationComponent } from './dashboard-user/update-collocation/update-collocation.component'
import { MapleafletComponent } from './dashboard-user/mapleaflet/mapleaflet.component';
import { ChattroomAssitanceComponent } from './dashboard-user/chattroom-assitance/chattroom-assitance.component';
import { ReclamtionComponent } from './dashboard-user/reclamtion/reclamtion.component';
import { WebsocketComponent } from './dashboard-user/websocket/websocket.component';
import { ClaimsComponent } from './dashboard-admin/claims/claims.component';
import { StatComponent } from './dashboard-admin/stat/stat.component';
import { ListcovoiturageAdComponent } from './dashboard-admin/listcovoiturage-ad/listcovoiturage-ad.component';
import { ListcollocationAdComponent } from './dashboard-admin/listcollocation-ad/listcollocation-ad.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './dashboard-admin/list-users/list-users.component';
import { MesAnnonceColloComponent } from './dashboard-user/mes-annonce-collo/mes-annonce-collo.component';
import { MesAnnonceCovoiComponent } from './dashboard-user/mes-annonce-covoi/mes-annonce-covoi.component';




export const routes: Routes = [
    { path: 'dashboardAdmin',canActivate:[authGuard], component: DashboardAdminComponent, children:[
        {path:'claims', component : ClaimsComponent},
        {path:'stat', component:StatComponent},
       {path: 'listCollocationAd', component: ListcollocationAdComponent},
      {path :'listCovoiturageAd', component :ListcovoiturageAdComponent},
      
      {path :'listUsers', component :ListUsersComponent},
    ] },
    {path:'home',component:HomeComponent},
   
    { path: 'dashboardUser',canActivate:[authGuard], component: DashboardUserComponent , children:[
        {path: 'Maps', component:MapleafletComponent},
        { path: 'add-collocation', component:AddCollocationComponent }, 
        { path: 'add-covoiturage', component:AddCovoiturageComponent }, 
        {path: 'listmeetcovoi', component: ListCovoiturageComponent},
        {path :'listcovoiturageUser', component :ListannonceuserComponent},
        
        {path: 'listcollocation', component: ListCollocationComponent}, 
        {path:'Chattroomassitance', component: ChattroomAssitanceComponent},
        {path:'reclamtion', component:ReclamtionComponent},

        {path:'collocationUs/:id',component:MesAnnonceColloComponent},
        {path:'covoiturageUs/:id',component:MesAnnonceCovoiComponent},
        {path:'updatecollocation',component:UpdateCollocationComponent} 
 

       ]},

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'home', pathMatch: 'full'},
    
];
