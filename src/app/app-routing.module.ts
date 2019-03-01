import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSeoComponent } from './seo/add-seo/add-seo.component';

const routes: Routes = [{path: 'seo', component: AddSeoComponent,
data: {
  title: 'Seo Title',
  metatags: {
    description: 'seo',
    keywords: 'some, keywords, here, separated, by, a comma'
  }
}
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
