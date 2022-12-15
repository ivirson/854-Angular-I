import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipCodeMask'
})
export class ZipCodeMaskPipe implements PipeTransform {

  transform(value: string | number): string {
    let formated = value + '';

    return formated
      .padStart(8, '0')
      .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
  }

}
