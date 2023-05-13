import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss'],
})
export class NumpadComponent implements OnInit {
  @Input() public value:string = '0,00'
  // @Input() public maxValue : null | number = null

  public numPad = [7,8,9,4,5,6,1,2,3,0]

  constructor(
    private modalController: ModalController
  ){

  }

  ngOnInit(): void {

  }

  public backSpacePad(){
    let deletedValue = this.value.slice(0,-1)
    this.ChangesInputCurrency(deletedValue)
  }

  pressPad(padValue:number){
    this.ChangesInputCurrency(`${this.value + padValue}`)
  }

  public ChangesInputCurrency(value: string) {

    const decimal: string = ',';
    const thousand: string = '.';

    if (RegExp(/$/g).test(value)) value.replace('$', '');
    if (value == '') value = '0' + decimal + '00';
    value = value.replace(/[\D]+/g, '');
    value = value.replace(/([0-9]{2})$/g, decimal + '$1');
    let parts = value.toString().split(decimal);
    if (parts[0] == '') parts[0] = '0';
    parts[0] = parseInt(parts[0]).toString();
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
    value = parts.join(decimal);
    this.value = `${value}`;
  }

  public async onExit(role: string, data?: any) {
    (await this.modalController.getTop())?.dismiss(data, role)
  }

  public onDone(){
    let parsed = Number(this.value.replace(/\$|,/g,'').replace(',','.'))
    this.onExit('done',parsed)
  }
}
