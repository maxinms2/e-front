import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'MXN', display: string | boolean = 'symbol', digitsInfo: string = '1.0-2', locale: string = 'en-US'): string | null {
    if (value == null) return null;

    // Usar el pipe currency interno de Angular para formatear el número
    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

    // Reemplazar el formato por defecto con un espacio entre el símbolo y el valor
    return formattedValue.replace('MX', '').replace('$', '$ ');
  }
}
