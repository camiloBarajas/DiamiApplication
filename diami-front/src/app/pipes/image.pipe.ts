import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagepipe',
  pure: false
})
export class ImagePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const image = value.substr(0, 7);
      console.log(image);
      if (image.includes('image')) {
        return 'assets/svg/NOT_FOUND.svg';
      } else {
        return value;
      }
    } else {
      return 'assets/svg/NOT_FOUND.svg';
    }
  }
}
