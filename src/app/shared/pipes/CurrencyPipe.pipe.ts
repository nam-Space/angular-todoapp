import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: any[]) {
    if (!value) value = '0';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(+value);
  }
}
