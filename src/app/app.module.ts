import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { Routes,RouterModule } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';

const routes : Routes = [
  {path:'', component:HomeComponent},
  {path:'admin/product', component: ProductListComponent},
  {path:'admin/product/addproduct', component: ProductAddComponent},
  {path: 'admin/product/update/:id', component:ProductAddComponent },

  {path: 'admin/category', component:CategoryListComponent },
  {path: 'admin/category/add', component:CategoryAddComponent},
  {path: 'admin/category/update/:id', component:CategoryAddComponent},
  /*{path: 'cart/detailproduct/:id', component:DetailProductComponent},
  {path: 'cart/sumary', component: SumaryOrderComponent, canActivate: [authGuard]},
  {path: 'payment/success', component: PaymentSuccessComponent},
  {path: 'user/register', component: RegistrationComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent}*/
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    HeaderAdminComponent,
    ProductAddComponent,
    CategoryListComponent,
    CategoryAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
