import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationServiceService } from 'src/app/service/location-service.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {

  tabVente=[];
  listTypeBien=[];
  listNatureBiens :any =[];
  loadSpinner: boolean = false;

  zone="";
  type="";
  natureBien="";
  listRecherche=[];
  loader: boolean = false;
  message:boolean=false;



  notEmptyPost = true;
  notScrolly = true;


  constructor(private spinner:NgxSpinnerService, private locationService:LocationServiceService) { }

  ngOnInit(): void {
    // this.tabVente = this.locationService.getVente();
    // this.loadInitPost();
    this.getVentes();
    this.getTypeBien();
    this.getNatureBien();
  }


  getVentes(){
    this.loadSpinner = true;
    this.locationService.getListVente().subscribe(response => {

     if (response['responseCode'] === 200){
       this.loadSpinner = false;
       this.tabVente = response["data"];
       localStorage.setItem("biens",JSON.stringify(this.tabVente))

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
},error=>{

});
}

getNatureBien(){
  this.locationService.getListNatureBien().subscribe(response => {
   if (response['responseCode'] === 200){
     this.listNatureBiens = response["data"];
     this.listNatureBiens.unshift({id:'',libelle:"Tout"})
   }
 },errors=>{
 });
}



rechercherBien(){
  this.loader = true
  let data = {
    zone: this.zone,
    type: this.type,
    natureBien:this.natureBien
  }
  this.locationService.rechercher(data).subscribe(response => {
    if (response['responseCode'] === 200){
      this.loader = false

      this.tabVente=response["data"];
    }else{

    }

})
}







  // loadInitPost(){
  //   return this.tabVente;
  // }

  // scrollToElement(element): void {
  //   element.scrollIntoView({behavior: "smooth", inline: "nearest"});
  // }

  // onScroll(){
  //   this.spinner.show();
  //   if (this.notScrolly && this.notEmptyPost){
  //     this.spinner.show();
  //     this.notScrolly =false;
  //     this.loadNextPost();
  //   }
  // }

  // loadNextPost(){
  //   const tab = this.tabVente;

  //   const lastPost = this.tabVente[this.tabVente.length - 1];

  //   const lastPostId =  lastPost.id

  //   const dataToSend = new FormData();

  //   dataToSend.append('id', lastPostId)
  // }

}
