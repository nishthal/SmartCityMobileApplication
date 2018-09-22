import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DustbinPage } from './dustbin';

@NgModule({
  declarations: [
    DustbinPage,
  ],
  imports: [
    IonicPageModule.forChild(DustbinPage),
  ],
})
export class DustbinPageModule {

}
