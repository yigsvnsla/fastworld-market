import { StorageMap } from '@ngx-pwa/local-storage';
import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  constructor(
    private renderer2: Renderer2,
    private storage: StorageMap
  ) {

  }

  public ngOnInit(): void {


    this.setTheme()
    // setStyleScrollBar()
  }


  public setTheme() {
    // Event MediaQueryList
    const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const root: Element = this.renderer2.selectRootElement('#root', true)

    root.classList.toggle('dark', prefersDark.matches)

    prefersDark.addEventListener('change', $event => {
      root.classList.toggle('dark', $event.matches)
    })

    // Event LocalStorage
    this.storage.watch('darkMode',{type:'boolean'}).subscribe(value => {
      if (value === true && window.matchMedia('(prefers-color-scheme: dark)').matches ) root.classList.add('dark');
      else root.classList.remove('dark')
    })
  }

}
