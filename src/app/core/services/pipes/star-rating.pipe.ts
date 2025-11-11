import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  standalone: true
})
export class StarRatingPipe implements PipeTransform {

  transform(value: number, maxStars: number = 5): string[] {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    const empty = maxStars - full - (hasHalf ? 1 : 0);

    return [
      ...Array(full).fill('full'),
      ...(hasHalf ? ['half'] : []),
      ...Array(empty).fill('empty')
    ];
  }

}
