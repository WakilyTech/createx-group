import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationServiceService } from 'src/app/service/location-service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tabAnimation:string[]=['.5s','1s','1.5s','2s','2.5s','3'];

  tabLocations = [];
  tabVente = [];

  contactForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegExp = /^(221|00221|\+221)?(77|78|75|70|76|33)[0-9]{7}$/mg;
  desactiverButton = false;
  btnAjoutSpinner = false;
  submitted = false;


  constructor(private locationService: LocationServiceService, private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getLocations();
    this.getVentes();
  }
  getLocations() {
    this.tabLocations = [];
    this.locationService.getListLocation().subscribe(response => {

      if (response['responseCode'] === 200) {
        let value = response["data"];
        if (value.length > 6) {
          for (let i = 0; i < 6; i++) {
            if (value[i].description)
              value[i].description = JSON.parse(value[i].description);
            else
              value[i].description = [];

            this.tabLocations.push(value[i]);
          }
        } else {
          for (let i = 0; i < value.length; i++) {
            value[i].description = JSON.parse(value[i].description);
            this.tabLocations.push(value[i]);
          }
          //  localStorage.setItem("biens",JSON.stringify(this.tabLocations))
        }
        localStorage.setItem("biens", JSON.stringify(this.tabLocations));
      }
    }, errors => {
    });
  }





  getVentes() {
    this.locationService.getListVente().subscribe(response => {
      if (response['responseCode'] === 200) {
        let datas = response['data'];
        for (let val of datas) {
          if (val.description != '')
            val.description = JSON.parse(val.description);
          else val.description = [];
        }
        this.tabVente = datas;
        localStorage.setItem("biens", JSON.stringify(this.tabVente))
      }
    }, errors => {
    });
  }


  scrollToElement(element): void {
    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }


  initForm() {
    this.contactForm = this.fb.group({
      nom_prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern(this.phoneRegExp)]],
      email: ['', Validators.pattern(this.emailPattern)],
      object: [''],
      message: ['', Validators.required],
    });
  }



  onSubmit() {
    if (this.contactForm.invalid) {
      this.checkValidity(this.contactForm)
      return;
    }
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment soumettre ce formulaire',
      //  type: 'info',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result["value"] == true) {
        this.btnAjoutSpinner = true;
        this.desactiverButton = true;
        this.locationService.contact(this.contactForm.value).subscribe((resp) => {
          if (resp['responseCode'] == 200) {
            this.desactiverButton = false;
            this.toastr.success('Demande envoyé avec succès');
            this.contactForm.reset();
          } else {
            this.desactiverButton = false;
            this.toastr.error('Attention!', resp['error'][0].message);
          }
        }, error => {
          this.desactiverButton = false;
          this.toastr.error('Attention!', error['error']['errors'][0].message);
        });
      }
    })
  }


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
