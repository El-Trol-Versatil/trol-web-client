//Basic
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Errors
import { ApiError } from './api-error/api-error';
import { ApiErrorBadInput } from './api-error/api-error-bad-input';
import { ApiErrorNotFound } from './api-error/api-error-not-found';
import { ApiErrorTimeOut } from './api-error/api-error-time-out';

//RXJS
import { Observable } from 'rxjs';
import { TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

// Constants
import { API_CONSTANTS } from '../core/constants/api.constants';

/**
 * Generic class for API management
 */
@Injectable()
export class ApiGenericProvider {

  /**
   * headers as an object
   */
  private headers: any;

  /**
   * URL to do the call to.
   */
  private url: string;

  /**
   * ApiGenericProvider constructor
   * @param serviceEndpoint service endpoint to append to url.
   * @param http HTTP service to do the calls.
   */
  constructor(protected serviceEndpoint: string, protected http: HttpClient) {
    this.headers = {};
    this.headers[API_CONSTANTS.CONTENT_TYPE] = API_CONSTANTS.JSON;
    this.url =`http://www.trollbackend.com/api/v1/${serviceEndpoint}`;
  }

  /**
   * Performs a GET call (if id given, appending id after url in the form: {url}{endpoint}/{id})
   * @param endpoint Additional specific endpoint of the request.
   * @param id Unique value from the object it wants to be retrieved.
   * @returns Promise that if resolved, will return call response.
   */
  protected get(endpoint: string, id?: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers);
    return this.http.get(id? `${this.url}${endpoint}/${encodeURIComponent(id)}`:`${this.url}${endpoint}`, { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      ).toPromise();
  }

  /**
   * Performs a POST call (if id given, appending id after url in the form: {url}{endpoint}/{id}) in order to create an object. Body call specifies object structure.
   * @param endpoint Additional specific endpoint of the request.
   * @param resource Structure specifying new object creation info.
   * @param id Unique value from the object it wants to be retrieved.
   * @returns Promise that if resolved, will return call response.
   */
  protected create(endpoint: string, resource: any, id?: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers);
    return this.http.post(id? `${this.url}${endpoint}/${encodeURIComponent(id)}`:`${this.url}${endpoint}`, JSON.stringify(resource),  { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      ).toPromise();
  }

  /**
   * Performs a PATCH call (if id given, appending id after url in the form: {url}{endpoint}/{id}) in order to update an object. Body call specifies object structure.
   * @param endpoint Additional specific endpoint of the request.
   * @param resource Object that needed info for the update.
   * @param id Unique value from the object it wants to be retrieved.
   * @returns Promise that if resolved, will return call response.
   */
  protected update(endpoint: string, resource: any, id?: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers);
    return this.http.put(id? `${this.url}${endpoint}/${encodeURIComponent(id)}`:`${this.url}${endpoint}`, JSON.stringify(resource),  { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      ).toPromise();
  }

  /**
   * Performs a DELETE call to {url}{endpoint}/{id} in order to remove an object.
   * @param endpoint Additional specific endpoint of the request.
   * @param id Unique value from the object specified.
   * @returns Promise that if resolved, will return call response.
   */
  protected delete(endpoint: string, id: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers);
    return this.http.delete(`${this.url}${endpoint}/${encodeURIComponent(id)}`,  { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      ).toPromise();
  }

  /**
   * Function that handles several different errors.
   * @param error error from response.
   */
  private handleError(error: Response): Observable<any> {
    if (error instanceof TimeoutError) {
      return Observable.throw(new ApiErrorTimeOut());
    } else if (error.status === 400) {
      return Observable.throw(new ApiErrorBadInput(error.json()));
    } else if (error.status === 404) {
      return Observable.throw(new ApiErrorNotFound());
    } else {
      return Observable.throw(new ApiError(error));
    }
  }

}