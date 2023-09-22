import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  set(name: string, value: string, attributes?: any): void {
    let cookieString = `${name}=${value};`;

    // SameSite属性のデフォルト値をセット
    if (!attributes || !attributes.sameSite) {
      cookieString += 'SameSite=Lax;';
    }

    for (const attrKey in attributes) {
      if (attributes.hasOwnProperty(attrKey)) {
        cookieString += `${attrKey}=${attributes[attrKey]};`;
      }
    }

    document.cookie = cookieString;
  }

  get(name: string): string | null {
    const match = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return match ? match[2] : null;
  }

  delete(name: string): void {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  check(name: string): boolean {
    const match = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return !!match;
  }

  getAll(): { [key: string]: string } {
    const pairs = document.cookie.split(';');
    const cookies: { [key: string]: string } = {};

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].trim().split('=');
      cookies[pair[0]] = pair[1];
    }

    return cookies;
  }
}
