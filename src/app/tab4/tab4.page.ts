import { LocalstorageService } from './../services/localstorage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private localstorageService:LocalstorageService) {

  }

}