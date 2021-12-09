import { DummyDetailResponse } from './../../models/dummyResponses';
import { SharedService } from 'src/app/services/shared.service';
import { DummiRestApiService } from './../../services/dummi-rest-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DummyData, DummyUpdateData } from 'src/app/models/dummy';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  isChangeSend = false;
  isOKResponse = false;
  isDataPending = false;
  detailFormGroup!: FormGroup;
  dummy: DummyData | undefined;
  dummyIdReceived = this.route.snapshot.paramMap.get('employeeid');
  dummyId = 0;

  constructor(private dummyService: DummiRestApiService,
              private commonsService: SharedService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.getData();
  }

  createForm(): void{
    this.detailFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required,
      Validators.maxLength(255)]),
      age: new FormControl(0, [Validators.required]),
      salary: new FormControl(0, [Validators.required])
    });
  }

   //#region GETS
   get name(): any { return this.detailFormGroup.get('name'); }

   get age(): any { return this.detailFormGroup.get('age'); }

   get salary(): any { return this.detailFormGroup.get('salary'); }
   //#endregion

   getData(): void{
      if(this.dummyIdReceived && this.dummyIdReceived != "0"){
        this.dummyId = +this.dummyIdReceived;

        this.dummyService.getDummyDetail(this.dummyId).subscribe({
          next: (response: DummyDetailResponse) => {
            if (response){
              this.dummy = response.data;
            }
            this.fillForm();
          },
          error: (error: any) => {
            this.fillForm();
          }
        });
      } else{
        this.fillForm();
      }
   }

   fillForm(): void{
    if (this.dummy !== undefined){
      this.detailFormGroup.controls.name.setValue(this.dummy.employee_name);
      this.detailFormGroup.controls.age.setValue(this.dummy.employee_age);
      this.detailFormGroup.controls.salary.setValue(this.dummy.employee_salary);
    } else {
      this.detailFormGroup.controls.name.setValue('');
      this.detailFormGroup.controls.age.setValue(0);
      this.detailFormGroup.controls.salary.setValue(0);
    }
  }

  onFormChange(): void{
    if (!this.isDataPending){
      this.isDataPending = true;
    }
  }

  isButtonFormDisabled(): boolean{
    return !(this.detailFormGroup.valid && this.isDataPending);
  }

  cancelUpdate(): void{
    this.isDataPending = false;
    this.fillForm();
  }

  validateFormGroupFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        if (control.value === ''){
          control.setErrors({required: true});
        }
      } else if (control instanceof FormGroup) {
        this.validateFormGroupFields(control);
      }
    });
  }

  cleanFields(): void{
    this.detailFormGroup.controls.name.setValue('');
    this.detailFormGroup.controls.name.setErrors(null);
    this.detailFormGroup.controls.age.setValue(0);
    this.detailFormGroup.controls.age.setErrors(null);
    this.detailFormGroup.controls.salary.setValue(0);
    this.detailFormGroup.controls.salary.setErrors(null);
  }


  onDataSubmit(): void {
    if (this.detailFormGroup.valid && this.isDataPending){
        this.continueSavingData();
    } else if (!this.detailFormGroup.valid) {
      this.validateFormGroupFields(this.detailFormGroup);
    }
  }

  continueSavingData(): void{
    const dummyRequest: DummyUpdateData = {
      id: this.dummyId,
      name: this.detailFormGroup?.value?.name,
      age: this.detailFormGroup?.value?.age.toString(),
      salary: this.detailFormGroup?.value?.salary.toString(),
    };

    if (this.dummyId && this.dummyId> 0){
      this.updateDummy(dummyRequest);
    } else{
      this.addDummy(dummyRequest);
    }
  }

  updateDummy(dummyRequest: DummyUpdateData): void{
      this.dummyService.putDummy(dummyRequest, this.dummyId).subscribe({
        next: (response: any) => {
          if (response){
            this.changeDone();
          } else{
            this.changeNotDone();
          }
        },
        error: (error: any) => {
          this.changeNotDone();
        }
      });
  } 

  addDummy(dummy: DummyUpdateData): void{
      this.dummyService.postDummy(dummy).subscribe({
        next: (response: any) => {
          if (response){
            this.changeDone();
          } else{
             this.changeNotDone();
          }
        },
        error: (error: any) => {
          this.changeNotDone();
        }
      });
  }

  changeDone(): void{
   this.isChangeSend = true;
   this.isOKResponse = true;
  }

  changeNotDone(): void{
    this.isChangeSend = true;
    this.isOKResponse = false;
   }

}
