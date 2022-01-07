import { LocationServiceService } from '../../../service/location-service.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  tabLocation=[];
  loadSpinner: boolean = false;
  searchValue:string;
  searchText: string;

  zone="";
  type="";
  listRecherche=[];
  loader: boolean = false;
  listTypeBien=[];
  min=0;
  max=0




  tabBien = [
    {
      "name":"Maison",
      "value":"Maison"
    },
    {
      "name":"Appartement",
      "value":"Appartement"
    }
  ]

  constructor(private locationService:LocationServiceService) { }

  ngOnInit(): void {
    // this.tabLocation = this.locationService.getLocation();
    this.getLocations();
    this.getTypeBien();
  }



  getLocations(){
    this.loadSpinner = true;

    this.locationService.getListLocation().subscribe(response => {

     if (response['responseCode'] === 200){
       this.loadSpinner = false;
       this.tabLocation = response["data"];
       localStorage.setItem("biens",JSON.stringify(this.tabLocation))
     }
   },errors=>{
     this.loadSpinner = false;
   });
 }

 getTypeBien(){
  this.locationService.getListTypeBien().subscribe(response => {
   if (response['responseCode'] === 200){
     this.listTypeBien = response["data"];
     this.listTypeBien.unshift({id:'',libelle:"Tout"});
   }
 },errors=>{
 });
}



 rechercherBien(){
  this.loader = true
  let data = {
    zone: this.zone,
    type: this.type
  }
  this.locationService.rechercherLocation(data).subscribe(response => {
    this.loader = false
    this.tabLocation=response["data"];
})
}


  // selectChangeHandler(event: any) {
  //   this.selectedDay = event.target.value;
  // }



    // onChange(getName)
    // {

    //     this.tabLocation.filter = getName.trim().toLowerCase();
    // }

  // scrollToElement(element): void {
  //   element.scrollIntoView({behavior: "smooth", inline: "nearest"});
  // }



}
