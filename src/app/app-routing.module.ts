import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/header/home/home.component';
import { ExchangesComponent } from './core/header/exchanges/exchanges.component';
import { ProductComponent } from './core/header/product/product.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'exchanges', component: ExchangesComponent },
  { path: 'product', component: ProductComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
