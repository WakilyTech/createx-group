import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from 'src/app/service/location-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-locationstandard',
  templateUrl: './locationstandard.component.html',
  styleUrls: ['./locationstandard.component.scss']
})
export class LocationstandardComponent implements OnInit {

  min = 0;
  max = 0;
  isSearch = false;
  loadSpinner = false;
  tabLocation = [];
  listTypeBien = [];
  listZone = [];
  listUsage = ['Habitation','Commercial','Inexistant'];
  zone = "";
  usage = "";
  searchGlobal = "";
  type = "";
  ttc = "";
  tcc = "";
  nature = "Location";
  prixMin = 0;
  prixMax = 0;
  loader:boolean = false;
  selectedIndex: number;
  selectedIndexx: number;
  loaderGlobale: boolean = false;
  desactiverButton = false;
  btnAjoutSpinner = false;
  numeroCniError = '';
  closeResult: string;
  rechercheBienForm: FormGroup;
  submitted = false;
  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  phoneRegExp = /^(221|00221|\+221)?(77|78|75|70|76|33)[0-9]{7}$/gm;

  tabSexe = [
    {
      name: 'Masculin',
      value: 'M',
    },
    {
      name: 'Féminin',
      value: 'F',
    },
  ];
  constructor(private locationService: LocationServiceService,private fb: FormBuilder,
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLocations();
    this.getTypeBien();
    this.getZone();
  }

  getLocations() {
    this.loadSpinner = true;

    this.locationService.getListLocation().subscribe(response => {

      if (response['responseCode'] === 200) {
        this.loadSpinner = false;
        let value = response["data"];
        for (let el of value) {
          if (el.description )
            el.description = JSON.parse(el.description);
          else 
          el.description = [];
        }
        this.tabLocation = value;
        localStorage.setItem("biens", JSON.stringify(this.tabLocation))
      }
    }, errors => {
      this.loadSpinner = false;
    });
  }


  getTypeBien() {
    this.locationService.getListTypeBien().subscribe(response => {
      if (response['responseCode'] === 200) {
        this.listTypeBien = response["data"];
        //  this.listTypeBien.unshift({id:'',libelle:"Tout"});
      }
    }, errors => {
    });
  }


  getZone() {
    this.locationService.getListZone().subscribe(response => {
      if (response['responseCode'] === 200) {
        this.listZone = response["data"];
      }
    }, errors => {
    });
  }

  rechercherBien() {
    this.loader = true;
    this.isSearch = false;
    let data = {
      zone: this.zone,
      type: this.type,
      nature: this.nature,
      prixMin: this.prixMin,
      prixMax: this.prixMax,
      usageBien: this.usage,
      ttc:this.ttc !='' ? parseInt(this.ttc):'',
      tcc: this.tcc !='' ? parseInt(this.tcc):'',
    }
    this.locationService.rechercherLocationPerso(data).subscribe(response => {
      this.loader = false
      let value = response["data"];
      for (let el of value) {
        if (el.description )
          el.description = JSON.parse(el.description)
        else el.description = [];
      }
      this.tabLocation = value;
      if(this.tabLocation.length == 0) this.isSearch = true;
      else this.isSearch = false;
    },error=> {
      this.loader =false;
    })
  }

  rechercherGlobale(){
    if(this.searchGlobal != ''){
      this.loaderGlobale = true;
      let data ={
        searchQuery :this.searchGlobal,
        isGlobal:true
      }
      this.locationService.rechercheGlobal(data,'public/biens-disponibles-en-location').subscribe(resp=>{
        this.loaderGlobale = false
        let value = resp["data"];
        for (let el of value) {
          if (el.description )
            el.description = JSON.parse(el.description)
          else 
          el.description = [];
        }
        this.tabLocation = value;
        if(this.tabLocation.length == 0) this.isSearch = true;
        else this.isSearch = false;
      },error=>{
        this.loaderGlobale=false;
      })
    }
  }

  selectType(index) {
    this.type = index;
  }


  selectZone(indexx) {
    this.zone = indexx;
  }

  selectUsage(indexx) {
    this.usage = indexx;
  }

  initForm(content?) {
    this.submitted = false;
    this.rechercheBienForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', Validators.required],
      telephone: [
        '',
        [Validators.required, Validators.pattern(this.phoneRegExp)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      numeroCni: ['', Validators.required],
      sexe: ['', Validators.required],
      // adresse: ['', Validators.required],
    });
    if (content) {
      this.open(content);
    }
  }

  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        backdrop: 'static',
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checknumeroCni() {
    if (
      this.rechercheBienForm.get('sexe').value != '' &&
      this.rechercheBienForm.get('numeroCni').value != ''
    ) {
      let valnumeroCni = this.rechercheBienForm.get('numeroCni').value.toString();
      let valSexe = this.rechercheBienForm.get('sexe').value;

      this.numeroCniError = '';

      if (valnumeroCni.length == 14 || valnumeroCni.length == 13) {
        if (valSexe == 'M') {
          let a = this.rechercheBienForm.get('numeroCni').value.toString().charAt(0);
          if (a != '1') {
            this.numeroCniError =
              'Le numéro de pièce doit commencer par 1 pour un homme';
          } else {
            this.numeroCniError = '';
          }
        } else if (valSexe == 'F') {
          let a = this.rechercheBienForm.get('numeroCni').value.toString().charAt(0);
          if (a != '2') {
            this.numeroCniError =
              'Le numéro de pièce doit commencer par 2 pour une femme';
          } else {
            this.numeroCniError = '';
          }
        }
      } else {
        this.numeroCniError =
          'Le numéro de pièce doit contenir 13 ou 14 caractères pour le CNI';
      }
    }

  }

  get formControls() {
    return this.rechercheBienForm.controls;
  }

  // cette fonction permet de verifier les champs obligatoire
  checkValidity(g: FormGroup) {
    Object.keys(g.controls).forEach(key => {
      g.get(key).markAsDirty();
    });
    Object.keys(g.controls).forEach(key => {
      g.get(key).markAsTouched();
    });
    Object.keys(g.controls).forEach(key => {
      g.get(key).updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.rechercheBienForm.invalid || this.numeroCniError != "") {
      this.checkValidity(this.rechercheBienForm)
      return;
    }

    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment faire cette demande ',
      //  type: 'info',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result["value"] == true) {
         let data = {
      zone: this.zone,
      type: this.type,
      nature: this.nature,
      prixMin: this.prixMin,
      prixMax: this.prixMax,
      usageBien: this.usage,
      ttc:this.ttc !='' ? parseInt(this.ttc):'',
      tcc: this.tcc !='' ? parseInt(this.tcc):'',
    }
    let value = {
      recherche:JSON.stringify(data),
      client:JSON.stringify(this.rechercheBienForm.value)
    }
    
    this.submitted = true;
      this.locationService.addRecherche(value).subscribe(resp=>{
        if (resp['responseCode'] == 200) {
          this.submitted = false;
          this.toastr.success('Demande envoyé avec succès');
          this.modalService.dismissAll();
          this.rechercheBienForm.reset();
        } else {
          this.submitted = false;
          this.toastr.error('Attention!', resp['error'][0].message);
        }
      }, error => {
        this.submitted = false;
        this.toastr.error('Attention!', error['error']['errors'][0].message);
      }); 
      }
    });
  }
}
