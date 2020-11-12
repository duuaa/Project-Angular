import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay, catchError,map } from 'rxjs/operators';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { BaseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

// import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader []>(BaseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(BaseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(BaseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
//before connect to server
// constructor() { }
// getLeaders(): Observable<Leader[]> {
//   return of(LEADERS).pipe(delay(2000));

// }

// getLeader(id: string): Observable<Leader> {
//   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
// }

// getFeaturedLeader(): Observable<Leader> {
//   return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));

//}
// another way without using RxJS the same for dishes and promotions
// getLeaders(): Promise<Leader[]> {
//   return new Promise(resolve =>{
//     //simulate serverletancy with 2 second  delay
//       setTimeout(()=> resolve(LEADERS),2000);
// });
// }

// getLeader(id: string): Promise<Leader> {
//   return new Promise(resolve =>{
//     //simulate serverletancy with 2 second  delay
//       setTimeout(()=> resolve( LEADERS.filter((leader) => (leader.id === id))[0]),2000);

// });
// }

// getFeaturedLeader(): Promise<Leader> {
//   return new Promise(resolve =>{
//     //simulate serverletancy with 2 second  delay
//       setTimeout(()=> resolve(LEADERS.filter((leader) => leader.featured)[0]),2000);
// });
// }
// -----------------------------------------
// using promises with of , and delay from rxjs
// getLeaders(): Promise<Leader[]> {
//   return of(LEADERS).pipe(delay(2000)).toPromise();

// }

// getLeader(id: string): Promise<Leader> {
//   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
// }

// getFeaturedLeader(): Promise<Leader> {
//   return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();

// }