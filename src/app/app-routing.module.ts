import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ApplicationFormComponent } from './component/admin/application/application-form/application-form.component';
import { ArticleContentComponent } from './component/article-content/article-content.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'app-form',
    component: ApplicationFormComponent,
  },
  {
    path: 'article/:id',
    component: ArticleContentComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: '403',
    loadChildren: () => import('./error403/error403.module').then( m => m.Error403PageModule)
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
