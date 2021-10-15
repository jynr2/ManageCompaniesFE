import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/company-model';
import { IdentificationTypeModel } from 'src/app/models/identification-type-model';
import { InfoPersonModel } from 'src/app/models/info-person-model';
import { CompanyService } from 'src/app/services/company.service';
import { IdentificationTypeServiceService } from 'src/app/services/identification-type-service.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  IsvisibleForm: boolean = false;
  isLegalPerson: boolean = false;
  isNotLegalPerson: boolean = false;
  IsDisableButton: boolean = true;
  companyForm: FormGroup;
  IdentificationsType: IdentificationTypeModel[] = [];
  nit: string = '';
  @ViewChild('NIT') NIT: ElementRef = new ElementRef(ViewChild);
  infoPerson: InfoPersonModel = new InfoPersonModel();


  constructor(private companyService: CompanyService, private identificationTypeServiceService: IdentificationTypeServiceService) {
    this.companyForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.companyForm = new FormGroup({
      companyIdentificationNumbre: new FormControl(),
      companyIdentificationId: new FormControl(Validators.required),
      companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      companyAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      companyTown: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      companyPhone: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
      companyEmail: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      firstLastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    });
  }

  ngOnInit(): void {
    this.GetAllIdentifications();
  }

  get companyIdentificationNumbre() { return this.companyForm.get('companyIdentificationNumbre'); }
  get companyIdentificationId() { return this.companyForm.get('companyIdentificationId'); }
  get companyName() { return this.companyForm.get('companyName'); }
  get companyAddress() { return this.companyForm.get('companyAddress'); }
  get companyTown() { return this.companyForm.get('companyTown'); }
  get companyPhone() { return this.companyForm.get('companyPhone'); }
  get companyEmail() { return this.companyForm.get('companyEmail'); }
  get firstName() { return this.companyForm.get('firstName'); }
  get firstLastName() { return this.companyForm.get('firstLastName'); }

  OnSaveCompany() {
    this.companyForm.controls.companyIdentificationNumbre.setValue(this.nit);
    if (!this.companyForm.get('companyName').invalid
      && this.companyForm.get('firstName').invalid
      && this.companyForm.get('firstLastName').invalid
    ) {
      this.companyForm.controls.firstName.setValue(this.companyForm.get('companyName').value)
      this.companyForm.controls.firstLastName.setValue(this.companyForm.get('companyName').value)
    } else if (this.companyForm.get('companyName').invalid
      && !this.companyForm.get('firstName').invalid
      && !this.companyForm.get('firstLastName').invalid) {
      this.companyForm.controls.companyName.setValue(`${this.companyForm.get('firstName').value} ${this.companyForm.get('firstLastName').value}`)
    }
    if (this.companyForm.valid) {
      let company: CompanyModel = {
        companyName: this.companyForm.get('companyName').value,
        companyAddress: this.companyForm.get('companyAddress').value,
        companyTown: this.companyForm.get('companyTown').value,
        companyPhone: this.companyForm.get('companyPhone').value,
        companyIdentificationId: this.companyForm.get('companyIdentificationId').value,
        companyEmail: this.companyForm.get('companyEmail').value,
        companyIdentificationNumbre: this.companyForm.get('companyIdentificationNumbre').value,
      };
      this.companyService.SaveCompany(company).subscribe(response => {
        if (response != null || response == undefined) {
          this.companyForm.reset();
          alert(`Nombre Empresa: ${response.companyName} \n Dirección: ${response.companyAddress} \n Ciudad: ${response.companyTown} \n Teléfono: ${response.companyPhone} \n Email: ${response.companyEmail} \n NIT ${response.companyIdentificationNumbre}`)
        }
      }, error => {
        alert('Ha ocurrido un error');
      });
    } else {
      alert('Ocurrio un error, revise los datos del formulario')
    }
  }

  CanRegister(): void {
    let numbreRandom = Math.round(Math.random() * 10)
    if (numbreRandom % 2 == 0) {
      this.IsvisibleForm = true;
    }
    else alert('No es posible realizar la transacción');
  }

  GetAllIdentifications() {
    this.identificationTypeServiceService.GetAllIdentificationType()
      .subscribe(Identifications => {
        this.IdentificationsType = Identifications;
      });
  }

  WritecompanyIdentificationNumbre() {
    let nit = this.NIT.nativeElement.value.toString();
    if (nit.length > 5 && nit.length < 10) {
      this.IsDisableButton = false;
      this.nit = nit;
    }else{
      this.IsDisableButton = true;
    }
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    if (deviceValue == 1) {
      this.isNotLegalPerson = false;
      this.isLegalPerson = true;
    } else {
      this.isLegalPerson = false;
      this.isNotLegalPerson = true;
    }
  }
}
