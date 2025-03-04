import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ホーム' },
  { path: 'about', component: AboutComponent, title: 'アバウト' },
  { path: 'products', component: ProductsComponent, title: '製品一覧' },
  { path: 'products/:id', component: ProductDetailComponent, title: '製品詳細' },
  { path: '**', component: NotFoundComponent, title: 'ページが見つかりません' }
];
