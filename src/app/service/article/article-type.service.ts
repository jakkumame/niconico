import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleTypeService {

  private typesData = [
    { value: 'report', label: '開催報告', color: '#ff9365' },
    { value: 'PR', label: 'PR', color: '#335cff' },
    { value: 'volunteer', label: 'ボランティア', color: '#00a900' },
    { value: 'support', label: 'ご支援', color: '#ec1800' },
    { value: 'topic', label: 'トピック', color: '#8a008a' },
    { value: 'other', label: 'その他', color: '#28acff' }
  ];

  constructor() { }

  getTypesData() {
    return this.typesData;
  }

  getBackgroundColor(type: string): string {
    const typeData = this.typesData.find(t => t.value === type);
    return typeData ? typeData.color : 'black';
  }

  getLabel(type: string): string {
    const typeData = this.typesData.find(t => t.value === type);
    return typeData ? typeData.label : type;
  }
}
