import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BingSpellcheckerService } from "../lib/bing-spellchecker.service";
import { HttpClientModule, HttpParams, HttpRequest } from "@angular/common/http";

describe('BingSpellcheckerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BingSpellcheckerService],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
  });

  it('should execute get request', async(inject(
    [BingSpellcheckerService, HttpTestingController],
    (service: BingSpellcheckerService, http: HttpTestingController) => {
      const responseString = "Response";

      // Execute and expect response
      service.check('input sentence', '/api/endpoint').subscribe(data => {
        console.log(data);
      });

      http.expectOne((req: HttpRequest<any>) => {
        return req.url === '/api/endpoint' && req.method === 'POST';
      }).flush(null, { status: 200, statusText: 'Ok' });

      // Assert that there are no outstanding requests.
      http.verify();
    })));
});
