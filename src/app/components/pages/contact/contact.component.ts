import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationServiceService } from 'src/app/service/location-service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  contactForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegExp = /^(221|00221|\+221)?(77|78|75|70|76|33)[0-9]{7}$/mg;
  desactiverButton = false;
  btnAjoutSpinner = false;
  submitted = false;

  constructor(private fb: FormBuilder, private locationService: LocationServiceService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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
        this.submitted = true;
        this.locationService.contact(this.contactForm.value).subscribe((response) => {
          if (response['responseCode'] === 200) {
            this.submitted = false;
            this.btnAjoutSpinner = false;
            this.toastr.success('Demande envoyé avec succès');
            this.contactForm.reset();
          } else {
            this.toastr.error('Attention!', response['error'][0].message);
            this.submitted = false;
            this.btnAjoutSpinner = false;
          }
        },
          error => {
            this.submitted = false;
            this.btnAjoutSpinner = false;
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
