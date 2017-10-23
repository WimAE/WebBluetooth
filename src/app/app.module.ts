import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { BluetoothService } from './bluetooth/bluetooth.service';


@NgModule({
  imports: [
    BrowserModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // enable logs
    }),
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BluetoothComponent
  ],
  providers: [
    BluetoothService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
