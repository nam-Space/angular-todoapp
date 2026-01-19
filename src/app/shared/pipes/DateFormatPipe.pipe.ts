import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dateFormatPipe',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: any[]) {
    if (!value) return 'N/A';
    return dayjs(value).format('DD/MM/YYYY HH:mm:ss');
  }
}
