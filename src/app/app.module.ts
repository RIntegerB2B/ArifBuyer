import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AddSeoComponent } from './seo/add-seo/add-seo.component';
import { SeoService } from './seo/seo.service';

@NgModule({
  declarations: [
    AppComponent,
    AddSeoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'seo'}),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
