import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from 'src/app/pipes/image.pipe';

@NgModule({
  declarations: [ImagePipe],
  exports: [ImagePipe],
  imports: [CommonModule]
})
export class PipesModule {}
