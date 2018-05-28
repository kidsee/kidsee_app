import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpasswordPage } from './forgotpassword';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ForgotpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotpasswordPage),
    TranslateModule,
  ],
})
export class RegisterPageModule {
}
