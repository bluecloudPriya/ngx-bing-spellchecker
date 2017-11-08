import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BingSpellcheckerService {

  constructor(private http: HttpClient) { }

  /**
   * Spell-checks a string with a specified proxy endpoint
   *
   * @param sentence
   * @param spellcheckUrl
   *
   * @returns {Observable<R|T>}
   */
  public check(sentence: string, spellcheckUrl = '/') {
    // Set the body
    const body = new HttpParams().set('text', sentence).toString();

    // set query string options
    const params = new HttpParams()
      .set('mode', 'proof')
      .set('mkt', 'en-US');

    // Set headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    // Make the API call
    return this.http.post(spellcheckUrl, body, {
      headers: headers,
      params: params,
    }).map(data => {
      return this.createResult(data);
    }).catch((error: any) => {
      // Handle failures
      return Observable.throw(error);
    });
  }

  /**
   * Creates a SpellcheckResult object from a raw object
   *
   * @param data
   *
   * @returns {any}
   */
  public createResult(data: any): SpellcheckResult {

    if (data._type && data.flaggedTokens) {
      const result = Object.assign(new SpellcheckResult(), data);

      result.flaggedTokens = result.flaggedTokens.map(flaggedToken => {
        const token = Object.assign(new SpellcheckToken(), flaggedToken);

        token.suggestions = token.suggestions.map(suggestion => {
          return Object.assign(new SpellcheckSuggestion(), suggestion);
        });

        return token;
      });

      return result;
    }
    return new SpellcheckResult();
  }
}

export class SpellcheckSuggestion {
  suggestion: string;
  score: number;
}

export class SpellcheckToken {
  offset: number;
  token: string;
  type: string;
  suggestions: Array<SpellcheckSuggestion>;
}

export class SpellcheckResult {
  _type: string;
  flaggedTokens: Array<SpellcheckToken>;
}
