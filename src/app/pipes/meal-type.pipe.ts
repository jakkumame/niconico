import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalMapping'
})
export class GeneralMappingPipe implements PipeTransform {

  transform(value: string, type: 'meal' | 'gender'): string {
    const mealTypeMapping: { [key: string]: string } = {
      'child': 'こども食',
      'baby': '離乳食',
      'adult': '大人食',
    };

    const genderMapping: { [key: string]: string } = {
      'male': '男性',
      'female': '女性',
      'other': 'その他',
    };

    if (type === 'meal') {
      return mealTypeMapping[value] || value;
    }
    if (type === 'gender') {
      return genderMapping[value] || value;
    }

    return value;
  }
}
