import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private httpClient: HttpClient) { }

  getListLocation() {
    return this.httpClient.get(environment.apiBaseUrl + 'public/biens-disponibles-en-location').pipe(response => response);
  }

  getListVente() {
    return this.httpClient.get(environment.apiBaseUrl + 'public/biens-disponibles-en-vente').pipe(response => response);
  }

  // List type de bien
  getListTypeBien() {
    return this.httpClient.get(environment.apiBaseUrl + 'public/type-biens').pipe(response => response);
  }

  getListNatureBien() {
    return this.httpClient.get(environment.apiBaseUrl + 'public/nature-biens').pipe(response => response);
  }

  getListZone() {
    return this.httpClient.get(environment.apiBaseUrl + 'public/biens/zones').pipe(response => response);
  }

  // getLocationLocalite(){
  //   return this.locations[0].localite;
  // }

  // getlocationById(id:number){
  //   return this.locations.find(location=>
  //     location.id === id);
  // }

  // rechercheVente
  rechercher(data) {
    return this.httpClient.get(environment.apiBaseUrl + 'public/biens/searchBiens?zone=' + data.zone + '&type=' + data.type + '&nature' + data.natureBien + '&vente=true');
  }

  // Recherche Location
  rechercherLocation(data) {
    return this.httpClient.get(environment.apiBaseUrl + 'public/biens/searchBiens?zone=' + data.zone + '&type=' + data.type);
  }


  // Recherche Location
  rechercherLocationPerso(data) {
    let parametres = new HttpParams();
    if (data.zone) {
      parametres = parametres.append("zone", data.zone)
    }
    if (data.type) {
      parametres = parametres.append("type", data.type)
    }
    if (data.nature) {
      parametres = parametres.append("nature", data.nature)
    }
    if (data.prixMin && data.prixMax) {
      parametres = parametres.append("prixMin", data.prixMin)
      parametres = parametres.append("prixMax", data.prixMax)

    }
    if(data.usageBien){
      parametres = parametres.append("usageBien", data.usageBien)
    }

    if(data.ttc){
      parametres = parametres.append("ttc", data.ttc)
    }
    if(data.tcc){
      parametres = parametres.append("tcc", data.tcc)
    }
    return this.httpClient.get(environment.apiBaseUrl + 'public/biens/advancedSearchBiens', { params: parametres });
  }

  rechercheGlobal(data, url) {
    const params = new HttpParams()
      .set('isGlobal', data.isGlobal)
      .set('searchQuery', data.searchQuery)
    return this.httpClient.get(environment.apiBaseUrl + url, { params })
      .pipe(response => response)
  }
  // ajouterDemande
  addClient(data) {
    return this.httpClient.post(environment.apiBaseUrl + 'public/clients', data).pipe(response => response);
  }

  addDemande(data) {
    return this.httpClient.post(environment.apiBaseUrl + 'public/visites', data).pipe(response => response);
  }

  addRecherche(data) {
    return this.httpClient.post(environment.apiBaseUrl + 'api/infos-recherche', data).pipe(response => response);
  }

  contact(data) {
    return this.httpClient.post(environment.apiBaseUrl + 'public/contacts', data).pipe(response => response);
  }

}
