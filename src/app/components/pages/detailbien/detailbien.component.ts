import { filter } from 'rxjs/operators';
import { LocationServiceService } from '../../../service/location-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { LocationServiceService } from '../service/location-service.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailbien',
  templateUrl: './detailbien.component.html',
  styleUrls: ['./detailbien.component.css'],
})
export class DetailbienComponent implements OnInit {
  location: any;
  vente: any;
  displayImg = 0;
  listImages = [];
  closeResult: string;
  desactiverButton = false;
  btnAjoutSpinner = false;
  numeroCniError = '';

  loginForm: FormGroup;
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

  constructor(
    private locationService: LocationServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    let listBien = JSON.parse(localStorage.getItem('biens'));
    let value = listBien.filter((el) => el.id == id);

    if (value.length > 0) {
      this.location = value[0];
      this.location.natureBien.libee = this.location.natureBien.libelle.toLowerCase();

      if (this.location['images'].length > 0) {
        
        this.listImages = this.location['images'];
        
      }
    }

    this.initForm();
  }

  initForm(content?) {
    this.submitted = false;
    this.loginForm = this.fb.group({
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
      this.loginForm.get('sexe').value != '' &&
      this.loginForm.get('numeroCni').value != ''
    ) {
      let valnumeroCni = this.loginForm.get('numeroCni').value.toString();
      let valSexe = this.loginForm.get('sexe').value;

      this.numeroCniError = '';

      if (valnumeroCni.length == 14 || valnumeroCni.length == 13) {
        if (valSexe == 'M') {
          let a = this.loginForm.get('numeroCni').value.toString().charAt(0);
          if (a != '1') {
            this.numeroCniError =
              'Le numéro de pièce doit commencer par 1 pour un homme';
          } else {
            this.numeroCniError = '';
          }
        } else if (valSexe == 'F') {
          let a = this.loginForm.get('numeroCni').value.toString().charAt(0);
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
    return this.loginForm.controls;
  }

  // onSubmit(){

  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  // }

  //   Swal.fire({
  //     title: 'Êtes-vous sûr(e)?',
  //     text: "De bien vouloir effectuer cette demande!",
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Confirmer',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.btnAjoutSpinner=true;
  //       this.desactiverButton = true;
  //       this.locationService.addDemande(this.loginForm.value).subscribe(response=>{

  //         if (response['responseCode'] === 200){
  //           this.desactiverButton = false;
  //           this.btnAjoutSpinner=false;
  //           Swal.fire(
  //             'Ajouter!',
  //             'Demande effectuée avec succés.',
  //             'success'
  //           );

  //           this.modalService.dismissAll();
  //         }else{
  //           this.desactiverButton = false;
  //           this.btnAjoutSpinner=false;
  //           Swal.fire(
  //             'Ajouter!',
  //             response["message"],
  //             'error'
  //           );
  //         }
  //       },errors=>{
  //         this.desactiverButton = false;
  //         this.btnAjoutSpinner=false;
  //         Swal.fire(
  //           'Ajouter!',
  //           errors.error.errors[0].message,
  //           'error'
  //         );
  //       });

  //     }
  //   })

  // }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid || this.numeroCniError != "") {
      this.checkValidity(this.loginForm)
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

        this.btnAjoutSpinner = true;
        this.desactiverButton = true;
        this.locationService.addClient(this.loginForm.value).subscribe((response) => {
          if (response['responseCode'] === 200) {

            // this.modalService.dismissAll();
            let data = {
              client: response['data']['id'],
              bien: this.location.id
            }
            this.locationService.addDemande(data).subscribe((data) => {
              if (data['responseCode'] === 200) {
                this.desactiverButton = false;
                this.btnAjoutSpinner = false;
                this.toastr.success('Demande envoyé avec succès');
                this.modalService.dismissAll();
              }
            })

          } else {
            this.toastr.error('Attention!', response['error'][0].message);
            this.desactiverButton = false;
            this.btnAjoutSpinner = false;
          }
        },
          error => {
            this.desactiverButton = false;
            this.btnAjoutSpinner = false;
            this.toastr.error('Attention!', error['error']['error'][0].message);
          });
      }
    })
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
}
