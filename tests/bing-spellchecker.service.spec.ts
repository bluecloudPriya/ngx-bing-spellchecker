import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BingSpellcheckerService } from "../lib/bing-spellchecker.service";
import { HttpClientModule, HttpRequest } from "@angular/common/http";
import 'rxjs/add/operator/first';

describe('BingSpellcheckerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BingSpellcheckerService],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
  });

  it('should execute when request succeeds', async(inject(
    [BingSpellcheckerService, HttpTestingController],
    (service: BingSpellcheckerService, http: HttpTestingController) => {

      // Execute and expect response
      service.check('input sentence', '/api/endpoint').first().subscribe(data => {
        expect(data.constructor.name).toBe('SpellcheckResult');
      });

      http.expectOne((req: HttpRequest<any>) => {
        return req.url === '/api/endpoint' && req.method === 'POST';
      }).flush(null, { status: 200, statusText: 'Ok' });

      // Assert that there are no outstanding requests.
      http.verify();
    })));

  it('should throw error when request fails', async(inject(
    [BingSpellcheckerService, HttpTestingController],
    (service: BingSpellcheckerService, http: HttpTestingController) => {
      const errorMessage = 'Something went wrong';

      // Execute and expect response
      service.check('input sentence', '/api/endpoint').first().subscribe(() => {}, error => {
        expect(error.message).toContain(errorMessage);
      });

      http.expectOne((req: HttpRequest<any>) => {
        return req.url === '/api/endpoint' && req.method === 'POST';
      }).flush(null, { status: 400, statusText: errorMessage });

      // Assert that there are no outstanding requests.
      http.verify();
    })));

  it('should create empty result when no type', async(inject(
    [BingSpellcheckerService, HttpTestingController],
    (service: BingSpellcheckerService, http: HttpTestingController) => {
      const result = service.createResult({});

      expect(result.constructor.name).toBe('SpellcheckResult');
      expect(result._type).toBeFalsy();
      expect(result.flaggedTokens).toBeFalsy();
    })));

  it('should create result when flagged tokens and suggestions present', async(inject(
    [BingSpellcheckerService, HttpTestingController],
    (service: BingSpellcheckerService, http: HttpTestingController) => {
      const responseObject = {
        _type: "type string",
        flaggedTokens: [
          {
            offset: 1,
            token: "token string",
            type: "type string",
            suggestions: [
              {
                suggestion: "a suggestion string",
                score: 90,
              },
              {
                suggestion: "another suggestion string",
                score: 80,
              },
            ]
          }
        ]
      };
      const result = service.createResult(responseObject);

      expect(result.constructor.name).toBe('SpellcheckResult');
      expect(result._type).toBe(responseObject._type);
      expect(result.flaggedTokens.length).toBe(responseObject.flaggedTokens.length);
      expect(result.flaggedTokens[0].suggestions.length)
        .toBe(responseObject.flaggedTokens[0].suggestions.length);
    })));

  it('should create result when no flagged tokens', async(inject(
    [BingSpellcheckerService, HttpTestingController],
    (service: BingSpellcheckerService, http: HttpTestingController) => {
      const responseObject = {
        _type: "type string",
        flaggedTokens: null,
      };
      const result = service.createResult(responseObject);

      expect(result.constructor.name).toBe('SpellcheckResult');
      expect(result._type).toBeFalsy();
      expect(result.flaggedTokens).toBeFalsy();
    })));
});
