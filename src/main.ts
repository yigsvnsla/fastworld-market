import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}


export const setStyleScrollBar = async () => {

  setTimeout(() => {
    const content = document.querySelector('ion-content');
    const styles = document.createElement('style');

    styles.textContent = `
      ::-webkit-scrollbar {
        width: 14px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #40404042;
        border-radius: 36px;
        margin: 1em;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: var(--ion-color-primary);
        border-radius: 36px;
        border: 4px solid rgba(0,0,0,0);
        background-clip: padding-box;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {

      }
    `;
    // content?.shadowRoot?.appendChild(styles);
  }, 150);

};



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
