import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSeoComponent } from './seo/add-seo/add-seo.component';
import { PageNotFountComponent } from './shared/page-not-fount/page-not-fount.component';
const routes: Routes = [{
  path: 'seo', component: AddSeoComponent,
  data: {
    title: 'Seo Title',
    metatags: {
      description: 'seo',
      keywords: 'some, keywords, here, separated, by, a comma'
    }
  }
}, {
  path: 'product',
  loadChildren: './product-management/product-management.module#ProductManagementModule'
},
{
  path: 'home',
  loadChildren: './home/home.module#HomeModule'
},
{
  path: 'shared',
  loadChildren: './shared/shared.module#SharedModule'
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}, { path: '**', component: PageNotFountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


