import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LocationComponent } from './components/pages/location/location.component';
import { VenteComponent } from './components/pages/vente/vente.component';
import { DetailbienComponent } from './components/pages/detailbien/detailbien.component';
import { PresentationComponent } from './components/pages/presentation/presentation.component';
import { LocationstandardComponent } from './components/pages/locationstandard/locationstandard.component';
import { VentestandardComponent } from './components/pages/ventestandard/ventestandard.component';
import { IndustrieComponent } from './components/pages/vetementProfessionnel/industrie/industrie.component';
import { HotellerieComponent } from './components/pages/vetementProfessionnel/hotellerie/hotellerie.component';


const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'contact-us',component:ContactComponent
  },
  {
    path:'presentation',component:PresentationComponent
  },
  // {
  //   path:'location',component:LocationComponent
  // },
  {
    path:'vente',component:VenteComponent
  },
  {
    path:'locationstandard',component:LocationstandardComponent
  },
  {
    path:'ventestandard',component:VentestandardComponent
  },
  {
    path:'detailbien/:id', component:DetailbienComponent
  },
  {
    path:'industrie', component:IndustrieComponent
  },
  {
    path:'hottellerie', component:HotellerieComponent
  },
  {
    path:'**',component:ErrorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
