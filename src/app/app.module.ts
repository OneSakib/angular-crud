import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import module
import { AuthModule } from './auth/auth.module';
import { CrudModule } from './crud/crud.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'
// Toaster
import { CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
// Guard
import { AuthGuard } from './guard/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CrudModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule, BrowserAnimationsModule, ToastrModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
