import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'marketplace',
    pathMatch:'full'
  },
  {
    path: 'marketplace',
    component: TabsPage,
    children: [
      {
        path:'',
        redirectTo:'products',
        pathMatch:'full',

      },
      {
        path: 'products',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'mi-carrito',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab3PageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
