import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookspacePage } from './bookspace';

@NgModule({
  declarations: [
    BookspacePage,
  ],
  imports: [
    IonicPageModule.forChild(BookspacePage),
  ],
})
export class BookspacePageModule {}
