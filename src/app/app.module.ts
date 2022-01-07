import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/layouts/preloader/preloader.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { Header2Component } from './components/layouts/header2/header2.component';
import { Footer2Component } from './components/layouts/footer2/footer2.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LocationComponent } from './components/pages/location/location.component';
import { VenteComponent } from './components/pages/vente/vente.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailbienComponent } from './components/pages/detailbien/detailbien.component';
import { PresentationComponent } from './components/pages/presentation/presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogsidebarComponent } from './components/layouts/blogsidebar/blogsidebar.component';
import {LocationstandardComponent } from './components/pages/locationstandard/locationstandard.component';
import { VentestandardComponent } from './components/pages/ventestandard/ventestandard.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndustrieComponent } from './components/pages/vetementProfessionnel/industrie/industrie.component';
import { HotellerieComponent } from './components/pages/vetementProfessionnel/hotellerie/hotellerie.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Header2Component,
    PreloaderComponent,
    Footer2Component,
    ContactComponent,
    ErrorComponent,
    HomeComponent,
    LocationComponent,
    VenteComponent,
    DetailbienComponent,
    PresentationComponent,
    BlogsidebarComponent,
    LocationstandardComponent,
    VentestandardComponent,
    IndustrieComponent,
    HotellerieComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar:true}), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
