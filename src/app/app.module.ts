import { TimeslotService } from './../service/timeslot.service';
import { TeacherGuard } from './teacher.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { ClassService } from '../service/class.service';
import { UserService } from '../service/user.service';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
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
import { SessionGuard } from './session.guard';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { DownloadMaterialsComponent } from './download-materials/download-materials.component';
import { MyMaterialsComponent } from './my-materials/my-materials.component';
import { UploadService } from '../service/upload.service';
import { AuthService } from '../service/auth.service';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminGuard } from './admin.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    StudentProfileComponent,
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
    MyScheduleComponent,
    DownloadMaterialsComponent,
    MyMaterialsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MaterializeModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoundProgressModule,
    RouterModule.forRoot([
      { path: 'home', component: HomepageComponent },
      { path: 'student-profile', component: StudentProfileComponent },
      { path: 'reset', component: ResetPasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent, canActivate: [SessionGuard] },
          { path: 'my-schedule', component: MyScheduleComponent, canActivate: [StudentGuard, SessionGuard] },
          { path: 'add-classes', component: AddClassesComponent, canActivate: [StudentGuard, SessionGuard] },
          { path: 'drop-classes', component: DropClassesComponent, canActivate: [StudentGuard, SessionGuard] },
          { path: 'download-materials', component: DownloadMaterialsComponent, canActivate: [StudentGuard, SessionGuard] },
          { path: 'checkout', component: CheckoutComponent, canActivate: [StudentGuard, SessionGuard] },



          { path: 'teachers/:username', component: ClassesByTeacherComponent, canActivate: [SessionGuard] },
          { path: 'admin/all-students', component: AllStudentsComponent, canActivate: [AdminGuard, SessionGuard] },
          { path: 'admin/all-teachers', component: AllTeachersComponent, canActivate: [AdminGuard, SessionGuard] },

          { path: 'teacher/my-classes', component: MyClassesComponent, canActivate: [TeacherGuard, SessionGuard] },
          { path: 'teacher/my-materials', component: MyMaterialsComponent, canActivate: [TeacherGuard, SessionGuard] }
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]),

  ],
  providers: [
    ClassService,
    UserService,
    AdminGuard,
    TeacherGuard,
    StudentGuard,
    SessionGuard,
    TimeslotService,
    AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
