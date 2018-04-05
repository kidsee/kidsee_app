import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePostPage } from './createpost';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreatePostPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePostPage),
    ComponentsModule,
    TranslateModule
  ],
  exports: [
    CreatePostPage
  ]
})
export class CreatePostPageModule {}
