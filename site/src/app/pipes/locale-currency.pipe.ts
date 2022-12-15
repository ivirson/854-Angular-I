import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeCurrency'
})
export class LocaleCurrencyPipe implements PipeTransform {

  transform(
    value: number,
    currencyCode = 'BRL',
    digitsInfo = '3.2-2',
    locale = 'pt-BR'
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo
    )
  }
}
