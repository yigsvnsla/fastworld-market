import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private actionSheetController: ActionSheetController
  ) { }

  public async presentItemActionSheet(id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      mode: 'ios',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cantidad',
          data: {
            action: 'Cantidad',
          },
        },
        {
          text: 'Ver Detalles',
          data: {
            action: 'Cantidad',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancelar',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result);

  }

}
