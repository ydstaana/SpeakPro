import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TeacherApplicationComponent } from './teacher-application/teacher-application.component';
import { RegistrationComponent } from './registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { AddClassesComponent } from './add-classes/add-classes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TeacherApplicationComponent,
    RegistrationComponent,
    MenuComponent,
    StudentProfileComponent,
    SideNavComponent,
    FooterComponent,
    AddClassesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MaterializeModule,
    RouterModule.forRoot([
      {path: 'home', component: HomepageComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'student-profile', component: StudentProfileComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
