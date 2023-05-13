import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IonToggle, ToggleCustomEvent } from '@ionic/angular';
import { StorageMap } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  public toggleDarkMode: boolean | undefined

  constructor(
    private storage: StorageMap
  ) {
    this.storage.watch('darkMode', { type: 'boolean' }).subscribe(value => this.toggleDarkMode = value)

  }

  public ngOnInit(): void {


  }

  public darkModeChange($event: Event) {
    const e = $event as ToggleCustomEvent
    this.storage.set('darkMode',e.detail.checked).subscribe();
  }

}


