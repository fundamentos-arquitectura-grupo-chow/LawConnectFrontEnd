import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import {NotificationsComponent} from "./followup/components/notifications/notifications.component";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {ForgotPasswordComponent} from "./iam/pages/forgot-password/forgot-password.component";
import {SignUpLawyerComponent} from "./iam/pages/sign-up-lawyer/sign-up-lawyer.component";
import {SignUpClientComponent} from "./iam/pages/sign-up-client/sign-up-client.component";
import {ForLawyersComponent} from "./iam/pages/for-lawyers/for-lawyers.component";
import {ChooseRoleComponent} from "./iam/pages/choose-role/choose-role.component";
import {
  AddSpecializationAndPriceComponent
} from "./iam/pages/add-specialization-and-price/add-specialization-and-price.component";
import {SuccessfulSignUpComponent} from "./iam/pages/successful-sign-up/successful-sign-up.component";
import {authenticationGuard} from "./iam/services/authentication.guard";
import {ReviewLegalCaseComponent} from "./legalcase/pages/review-legal-case/review-legal-case.component";
import {DocumentManagementComponent} from "./legalcase/pages/document-management/document-management.component";
import {PaymentManagementComponent} from "./feeing/pages/payment-management/payment-management.component";
import {HomeClientComponent} from "./profile/pages/home-client/home-client.component";
import {
  LawyerProfileClientviewComponent
} from "./profile/components/lawyer-profile-clientview/lawyer-profile-clientview.component";
import {LawyerListComponent} from "./profile/components/lawyer-list/lawyer-list.component";
import {MakeConsultationComponent} from "./consultation/components/make-consultation/make-consultation.component";
import {
  ViewConsultationsMadeComponent
} from "./consultation/components/view-consultations-made/view-consultations-made.component";
import {ViewLegalCaseClientComponent} from "./legalcase/pages/view-legal-case-client/view-legal-case-client.component";
import {CasesComponent} from "./legalcase/pages/cases/cases.component";
import {LawyerSearchComponent} from "./profile/components/lawyer-search/lawyer-search.component";
import {HomeLawyerComponent} from "./profile/pages/home-lawyer/home-lawyer.component";
import {ViewLegalCaseLawyerComponent} from "./legalcase/pages/view-legal-case-lawyer/view-legal-case-lawyer.component";
import {
  ViewConsultationsLawyerComponent
} from "./consultation/components/view-consultations-lawyer/view-consultations-lawyer.component";
import {ConsultationsComponent} from "./consultation/pages/consultations/consultations.component";
import {ChatroomComponent} from "./communication/components/chatroom/chatroom.component";
import {
  FaceToFaceAppointmentCalendarComponent
} from "./communication/components/face-to-face-appointment-calendar/face-to-face-appointment-calendar.component";
import {VideoCallComponent} from "./communication/components/video-call/video-call.component";


const routes: Routes = [
  { path: 'documents/:legalCaseId', component: DocumentManagementComponent, canActivate: [authenticationGuard] },
  { path: 'payments/:consultationId', component: PaymentManagementComponent, canActivate: [authenticationGuard] },
  { path: 'video-call/:consultationId', component: VideoCallComponent, canActivate: [authenticationGuard] },
  { path: 'appointments/:consultationId', component: FaceToFaceAppointmentCalendarComponent, canActivate: [authenticationGuard] },
  { path: 'chat-room/:consultationId', component: ChatroomComponent, canActivate: [authenticationGuard] },
  { path: 'chat-room', component: ChatroomComponent, canActivate: [authenticationGuard] },
  { path:'appointments', component: FaceToFaceAppointmentCalendarComponent, canActivate: [authenticationGuard]},
  { path:'video-call', component: VideoCallComponent, canActivate: [authenticationGuard]},
  { path: 'consultations', component: ConsultationsComponent, canActivate: [authenticationGuard] },
  { path: 'home-lawyer', component: HomeLawyerComponent, canActivate: [authenticationGuard] },
  { path: 'lawyer-search', component: LawyerSearchComponent, canActivate: [authenticationGuard] },
  { path: 'home-client', component: HomeClientComponent, canActivate: [authenticationGuard]},
  { path: 'cases', component: CasesComponent, canActivate: [authenticationGuard] },
  { path: 'view-legal-case-client/:consultationId', component: ViewLegalCaseClientComponent, canActivate: [authenticationGuard] },
  { path: 'view-legal-case-lawyer/:consultationId', component: ViewLegalCaseLawyerComponent, canActivate: [authenticationGuard] },
  { path: 'view-consultations-made/:lawyerId', component: ViewConsultationsMadeComponent, canActivate: [authenticationGuard] },
  { path: 'make-consultation/:lawyerId', component: MakeConsultationComponent, canActivate: [authenticationGuard] },
  { path: 'lawyer-list', component: LawyerListComponent, canActivate: [authenticationGuard] },
  { path: 'lawyer-profile/:lawyerId', component: LawyerProfileClientviewComponent, canActivate: [authenticationGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [authenticationGuard]},
  { path: 'sign-in', component: SignInComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'choose-role', component: ChooseRoleComponent },
  { path: 'for-lawyers', component: ForLawyersComponent },
  { path: 'add-specialization-and-price', component: AddSpecializationAndPriceComponent },
  { path: 'successful', component: SuccessfulSignUpComponent },
  { path: 'sign-up-lawyer', component: SignUpLawyerComponent },
  { path: 'sign-up-client', component: SignUpClientComponent },
  { path: 'review-legal-case', component: ReviewLegalCaseComponent, canActivate: [authenticationGuard] },
  { path: 'documents', component: DocumentManagementComponent, canActivate: [authenticationGuard] },
  { path: 'payments', component: PaymentManagementComponent, canActivate: [authenticationGuard] },


  { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
