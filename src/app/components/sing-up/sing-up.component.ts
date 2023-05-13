import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CustomValidators } from '../../core/utils/customValidators';
@Component({
  selector: 'app-sing-up-component',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {

  public formUserRegister: FormGroup
  public statusLoading = false
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.formUserRegister = this.formBuilder.nonNullable.group({
      name: ['', [
        CustomValidators.usernameValidator,
        Validators.required
      ]],
      lastname: ['', [
        CustomValidators.usernameValidator,
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.emailValidator,
      ]],
      phone: ['', [
        Validators.required,
        CustomValidators.phoneValidator
      ]],
      password: ['', [
        Validators.required,
        CustomValidators.passwordValidator
      ]],
      confirmPassword: ['', [
        Validators.required,
        CustomValidators.passwordValidator,
        (AbstractControl: AbstractControl<string>) => {
          const value = AbstractControl.value
          if (value == '' || RegExp(/ /).test(value)) return { textEmpty: true }
          if (this.formUserRegister.get(['password'])?.value != value) return { notMatch: true }
          return null
        }
      ]]
    })
  }

  public get getPasswordStatus(): string {
    return (this.formUserRegister.get(['password']) as any)?.passwordStatus
  }

  public get passwordStatusColor() {
    const status: string | undefined = (this.formUserRegister.get(['password']) as any)?.passwordStatus
    if (status == 'low') return 'var(--ion-color-danger)';
    if (status == 'medium') return 'var(--ion-color-warning)';
    if (status == 'hard') return 'var(--ion-color-success)';
    return 'primary'
  }

  ngOnInit(): void {
    this.formUserRegister.valueChanges.subscribe(e => console.log(this.formUserRegister))
  }

  public onSubmit() {
    this.statusLoading = true

    setTimeout(()=>{
      this.statusLoading = false
    },2000)
  }

}
