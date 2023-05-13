import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonItemGroup } from '@ionic/angular';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit {

  @ViewChild('formLoginRef') formLoginRef!: IonItemGroup

  public formLogin: FormGroup
  public loading: boolean

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.loading = false
    this.formLogin = this.formBuilder.nonNullable.group({
      email: ['', [
        Validators.required,
        Validators.nullValidator,
        Validators.email,
        (emailControl:AbstractControl<string>)=>{
          // si el valor es diferente de vacio y el patron verifica que es un correo valido
          if (emailControl.value  != '' && RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(emailControl.value) ){
            if(emailControl.value.includes(' ')){
              emailControl.setValue(emailControl.value.trim())
            }
            return null
          }else{
            return {invalidEmail:true}
          }
        }
      ]],
      pass: ['', [Validators.required, Validators.nullValidator]]
    })
  }

  public ngOnInit() {
    this.formLogin.reset()
  }

  public enterOrGo() {
    if ( !this.formLogin['valid'] ) {
      // intentamos buscar los elementos hijos del formRef desde el template
      for (const key in this.formLoginRef["el"].children) {
        // validamos que dicha propiedad exista
        if (Object.prototype.hasOwnProperty.call(this.formLoginRef["el"].children, key)) {
          // hacemos scope a los "ion-items, para buscar en sus propiedades hijas los inputs"
          if (this.formLoginRef["el"].children[key].localName == 'ion-item') {
            // intentamos buscar los elementos hijos del "ion-item" desde la key
            for (const cKey in this.formLoginRef["el"].children[key].children) {
              // validamos que las propiedades exista
              if (Object.prototype.hasOwnProperty.call(this.formLoginRef["el"].children[key].children, cKey)) {
                // hacemos scope a los inputs
                if (this.formLoginRef["el"].children[key].children[cKey].localName == 'ion-input') {
                  // si el valor valor es vacio...
                  if ((this.formLoginRef["el"].children[key].children[cKey] as HTMLIonInputElement).value == '') {
                    // hacemos focus a el input que este vacio
                    (this.formLoginRef["el"].children[key].children[cKey] as HTMLIonInputElement).setFocus()
                    return
                  }
                }
              }
            }
          }
        }
      }
    }else{
      this.onLogin()
    }
  }

  onLogin() {
    console.log('dasdas');

  }

}
