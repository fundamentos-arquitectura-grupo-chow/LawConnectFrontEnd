import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { LawyerService } from './profile/services/lawyer.service';
import { CurrentUserComponent } from './profile/components/current-user/current-user.component';
import { FooterComponent } from './public/components/footer/footer.component';
import { ToolbarComponent } from './public/components/toolbar/toolbar.component';
import { NotificationsComponent } from './followup/components/notifications/notifications.component';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './iam/pages/forgot-password/forgot-password.component';
import { SignUpLawyerComponent } from './iam/pages/sign-up-lawyer/sign-up-lawyer.component';
import { SignUpClientComponent } from './iam/pages/sign-up-client/sign-up-client.component';
import { AddSpecializationAndPriceComponent } from './iam/pages/add-specialization-and-price/add-specialization-and-price.component';
import { ForLawyersComponent } from './iam/pages/for-lawyers/for-lawyers.component';
import { ChooseRoleComponent } from './iam/pages/choose-role/choose-role.component';
import { SuccessfulSignUpComponent } from './iam/pages/successful-sign-up/successful-sign-up.component';
import {NgOptimizedImage} from "@angular/common";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import { AuthenticationSectionComponent } from './iam/component/authentication-section/authentication-section.component';
import {AuthenticationInterceptor} from "./iam/services/authentication.interceptor";
import {AuthenticationService} from "./iam/services/authentication.service";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {ReviewLegalCaseComponent} from "./legalcase/pages/review-legal-case/review-legal-case.component";
import {DocumentManagementComponent} from "./legalcase/pages/document-management/document-management.component";
import {ConfirmRejectionComponent} from "./legalcase/components/confirm-rejection/confirm-rejection.component";
import {DocumentTableComponent} from "./legalcase/components/document-table/document-table.component";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import { ConfirmCloseCaseComponent } from './legalcase/components/confirm-close-case/confirm-close-case.component';
import { AddPaymentComponent } from './feeing/components/add-payment/add-payment.component';
import { PaymentTableComponent } from './feeing/components/payment-table/payment-table.component';
import { PaymentManagementComponent } from './feeing/pages/payment-management/payment-management.component';
import { AddDocumentComponent } from './legalcase/components/add-document/add-document.component';
import { HomeClientComponent } from './profile/pages/home-client/home-client.component';
import { LawyerListComponent } from './profile/components/lawyer-list/lawyer-list.component';
import {ClientService} from "./profile/services/client.service";
import { LawyerProfileClientviewComponent } from './profile/components/lawyer-profile-clientview/lawyer-profile-clientview.component';
import { MakeConsultationComponent } from './consultation/components/make-consultation/make-consultation.component';
import {ConsultationService} from "./consultation/services/consultation.service";
import { ViewConsultationsMadeComponent } from './consultation/components/view-consultations-made/view-consultations-made.component';
import { ViewLegalCaseClientComponent } from './legalcase/pages/view-legal-case-client/view-legal-case-client.component';
import { ViewLegalCaseLawyerComponent } from './legalcase/pages/view-legal-case-lawyer/view-legal-case-lawyer.component';
import { ListLegalCasesComponent } from './legalcase/components/list-legal-cases/list-legal-cases.component';
import { CasesComponent } from './legalcase/pages/cases/cases.component';
import { LastLegalCasesComponent } from './legalcase/components/last-legal-cases/last-legal-cases.component';
import { LawyerSearchComponent } from './profile/components/lawyer-search/lawyer-search.component';
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import { LawyerProfileComponent } from './profile/pages/lawyer-profile/lawyer-profile.component';
import {ChatroomComponent} from "./communication/components/chatroom/chatroom.component";
import {
  FaceToFaceAppointmentCalendarComponent
} from "./communication/components/face-to-face-appointment-calendar/face-to-face-appointment-calendar.component";
import {VideoCallComponent} from "./communication/components/video-call/video-call.component";
import { HomeLawyerComponent } from './profile/pages/home-lawyer/home-lawyer.component';
import { ViewConsultationsLawyerComponent } from './consultation/components/view-consultations-lawyer/view-consultations-lawyer.component';
import { ConsultationsComponent } from './consultation/pages/consultations/consultations.component';
import { CompleteSignUpLawyerComponent } from './profile/components/complete-sign-up-lawyer/complete-sign-up-lawyer.component';
import { AddTypeLawyerComponent } from './profile/components/add-type-lawyer/add-type-lawyer.component';
import { CreateAppointmentDialogComponent } from './communication/components/create-appointment-dialog/create-appointment-dialog.component';
import {MatList, MatListItem} from "@angular/material/list";
import { CreateVideoCallDialogComponent } from './communication/components/create-video-call-dialog/create-video-call-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CompletePaymentComponent } from './feeing/components/complete-payment/complete-payment.component';
import { LastLegalCasesClientComponent } from './legalcase/components/last-legal-cases-client/last-legal-cases-client.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CurrentUserComponent,
    FooterComponent,
    ToolbarComponent,
    NotificationsComponent,
    SignInComponent,
    ForgotPasswordComponent,
    SignUpLawyerComponent,
    SignUpClientComponent,
    AddSpecializationAndPriceComponent,
    ForLawyersComponent,
    ChooseRoleComponent,
    SuccessfulSignUpComponent,
    AuthenticationSectionComponent,
    ReviewLegalCaseComponent,
    DocumentManagementComponent,
    ConfirmRejectionComponent,
    DocumentTableComponent,
    ConfirmCloseCaseComponent,
    AddPaymentComponent,
    PaymentTableComponent,
    PaymentManagementComponent,
    AddDocumentComponent,
    HomeClientComponent,
    LawyerListComponent,
    LawyerProfileClientviewComponent,
    MakeConsultationComponent,
    ViewConsultationsMadeComponent,
    ViewLegalCaseClientComponent,
    ViewLegalCaseLawyerComponent,
    ListLegalCasesComponent,
    CasesComponent,
    LastLegalCasesComponent,
    LawyerSearchComponent,
    LawyerProfileComponent,
    ChatroomComponent,
    FaceToFaceAppointmentCalendarComponent,
    VideoCallComponent,
    HomeLawyerComponent,
    ViewConsultationsLawyerComponent,
    ConsultationsComponent,
    CompleteSignUpLawyerComponent,
    AddTypeLawyerComponent,
    CreateAppointmentDialogComponent,
    CreateVideoCallDialogComponent,
    CompletePaymentComponent,
    LastLegalCasesClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    NgOptimizedImage,
    MatDialogContent,
    MatDialogActions,
    MatSelect,
    MatOption,
    MatListItem,
    MatList,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSelectTrigger
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    LawyerService,
    ClientService,
    ConsultationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
