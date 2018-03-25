import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';
import { PostEditorComponent } from './post-editor/post-editor';

@NgModule({
	declarations: [
		BaseHeaderComponent,
		PostEditorComponent
	],
	imports: [IonicModule],
	exports: [
		BaseHeaderComponent,
		PostEditorComponent
	]
})
export class ComponentsModule {}
