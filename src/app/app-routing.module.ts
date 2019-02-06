import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

import { ContactsComponent } from './contacts/contacts.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [

    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "contacts",
        component: ContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    bootstrap: [AppComponent]
})

export class AppRoutingModule { }