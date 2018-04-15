import { TeacherGuard } from './teacher.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { ClassService } from '../service/class.service';
import { UserService } from '../service/user.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FooterComponent } from './footer/footer.component';
import { AddClassesComponent } from './add-classes/add-classes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ClassesByTeacherComponent } from './classes-by-teacher/classes-by-teacher.component';
import { DropClassesComponent } from './drop-classes/drop-classes.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AppInterceptor } from './app.interceptor';
import { StudentGuard } from './student.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    StudentProfileComponent,
    FooterComponent,
    AddClassesComponent,
    DashboardComponent,
    SidebarComponent,
    EditProfileComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    ClassesByTeacherComponent,
    DropClassesComponent,
    MyClassesComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MaterializeModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomepageComponent },
      { path: 'student-profile', component: StudentProfileComponent },
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent },
          { path: 'my-schedule', component: MyClassesComponent, canActivate: [StudentGuard] },
          { path: 'add-classes', component: AddClassesComponent, canActivate: [StudentGuard] },
          { path: 'drop-classes', component: DropClassesComponent, canActivate: [StudentGuard] },
          { path: 'checkout', component: CheckoutComponent, canActivate: [StudentGuard] },



          { path: 'teachers/:id', component: ClassesByTeacherComponent },
          { path: 'all-students', component: AllStudentsComponent },
          { path: 'all-teachers', component: AllTeachersComponent },

          { path: 'teacher/my-classes', component: MyClassesComponent, canActivate: [TeacherGuard] },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]),

  ],
  providers: [
    ClassService,
    UserService,
    TeacherGuard,
    StudentGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
