import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './core/header/home/home.component';
import { ExchangesComponent } from './core/header/exchanges/exchanges.component';
import { ProductComponent } from './core/header/product/product.component';
import { LoginComponent } from './core/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingSpinnerComponent } from './core/shared/components/loading-spinner/loading-spinner.component';
import { ScrollingInfoComponent } from './core/shared/components/scrolling-info/scrolling-info.component';
import { TrendsComponent } from './core/header/home/trends/trends.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './service/config.service';

export function loadConfig(configService: ConfigService) {
  return () =>
    configService
      .loadConfig()
      .toPromise()
      .then((config) => {
        configService.setConfig(config);
      });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ExchangesComponent,
    ProductComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    ScrollingInfoComponent,
    TrendsComponent,
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
