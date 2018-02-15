import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BaseHeaderComponent } from './base-header/base-header';

@NgModule({
	declarations: [BaseHeaderComponent],
	imports: [IonicModule],
	exports: [BaseHeaderComponent]
})
export class ComponentsModule {}
