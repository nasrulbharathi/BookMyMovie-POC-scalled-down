import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { JSON_SERVER_URLS } from '../../shared/config';
import { LoginService } from './login.service';

import { environment } from '../../../environments/environment';

beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [LoginService],
        imports: [HttpClientTestingModule]
      });



});
describe('AdminService', () => {

    function setup() {
        const sharedService = TestBed.get(LoginService);
        const httpTestingController = TestBed.get(HttpTestingController);
        return { sharedService, httpTestingController };
      }


  it('should run #getUserData()', async () => {
    const { sharedService, httpTestingController } = setup();
    const userData = {};
    sharedService.getUserData().subscribe(data => {
      expect(data.mapData).toEqual(userData);
    });

    const req = httpTestingController.expectOne(environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS);

    expect(req.request.method).toBe('GET');

    req.flush({
      mapData: userData
    });
});

afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });
});
