import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { LogEntry } from './log-entry.class';
import { JSON_SERVER_URLS } from '../config';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class LogPublisherService {

    public logDetails = [];

    constructor(private http: HttpClient) {
    }

    // Add log entry to backend

    public log(entry: LogEntry): void {
        let logDetails = {
            logInformation : []
        };
        this.http.get(environment.JSONSERVER + JSON_SERVER_URLS.LOGGING_URL)
        .subscribe((res: any) => {
            logDetails = res;
            logDetails.logInformation.push(entry);
            this.http.post(environment.JSONSERVER + JSON_SERVER_URLS.LOGGING_URL, logDetails)
            .subscribe((post: any) => {
            },
              (e) => console.log(e, 'while adding data'));
        },
          (e) => console.log(e, 'while fetching data'));
    }
}
