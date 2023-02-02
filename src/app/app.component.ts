import { LocalstorageService } from './services/localstorage.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private localstorageService: LocalstorageService,
    private renderer2: Renderer2
  ) {

  }

  public ngOnInit(): void {

    this.localstorageService.init()
    // this.localstorageService.getStorages.subscribe(console.log)
    this.localstorageService.setStorage('config')
    this.localstorageService.setStorage('config1','hello world')
    this.localstorageService.setStorage('config2', 0.100)
    this.localstorageService.setStorage('config3', true)
    this.localstorageService.setStorage('config4', {val:{val_1:1,val_2:'2'}})
    // this.localstorageService.getStorages$.subscribe(storages=>{
    //   console.log(storages);
    //   // storages.forEach(x=>console.log(x))
    // })

    this.localstorageService.getStorage$('config').subscribe(console.log)

    const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const root: Element = this.renderer2.selectRootElement('#root', true)
    root.classList.toggle('dark', prefersDark.matches)
    prefersDark.addEventListener('change', $event => {
      root.classList.toggle('dark', $event.matches)
    })



    // const _COLOR_THEME = 'color-theme'
    // if (localStorage.getItem(_COLOR_THEME) === 'dark' || (!(_COLOR_THEME in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //     document.body.classList.add('dark');
    // } else {
    //     document.body.classList.remove('dark')
    // }


  }
}
