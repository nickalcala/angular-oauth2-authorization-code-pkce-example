import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LocalStorageModule.forRoot({
            prefix: 'tutorial',
            storageType: 'localStorage'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
