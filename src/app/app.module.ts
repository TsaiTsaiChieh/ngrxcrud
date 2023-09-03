import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddassociateComponent } from './component/addassociate/addassociate.component';
import {MaterialModule} from './Material.Module';

@NgModule({
  declarations: [
    AppComponent,
    AddassociateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
