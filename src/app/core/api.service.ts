//Basic
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Errors
import { ApiError } from './api-error/api-error';
import { ApiErrorBadInput } from './api-error/api-error-bad-input';
import { ApiErrorNotFound } from './api-error/api-error-not-found';
import { ApiErrorTimeOut } from './api-error/api-error-time-out';

//RXJS
import { Observable, TimeoutError, lastValueFrom, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

// Constants
import { API_CONSTANTS, BACKEND_CONFIG } from '../core/constants/api.constants';

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
    this.url =`${BACKEND_CONFIG.BASE_URL}${serviceEndpoint}`;
  }

  /**
   * Performs a GET call (if id given, appending id after url in the form: {url}{endpoint}/{id})
   * @param endpoint Additional specific endpoint of the request.
   * @param id Unique value from the object it wants to be retrieved.
   * @returns Promise that if resolved, will return call response.
   */
  protected async get(endpoint: string, id?: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers);
    const response = this.http.get(id? `${this.url}${endpoint}/${encodeURIComponent(id)}`:`${this.url}${endpoint}`, { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      );
      return await lastValueFrom(response);
  }

  /**
   * Performs a POST call (if id given, appending id after url in the form: {url}{endpoint}/{id}) in order to create an object. Body call specifies object structure.
   * @param endpoint Additional specific endpoint of the request.
   * @param resource Structure specifying new object creation info.
   * @param id Unique value from the object it wants to be retrieved.
   * @returns Promise that if resolved, will return call response.
   */
  protected async create(endpoint: string, resource: any, id?: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers),
      response = this.http.post(id? `${this.url}${endpoint}/${encodeURIComponent(id)}`:`${this.url}${endpoint}`, JSON.stringify(resource),  { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      );
      return await lastValueFrom(response);
  }

  /**
   * Performs a PATCH call (if id given, appending id after url in the form: {url}{endpoint}/{id}) in order to update an object. Body call specifies object structure.
   * @param endpoint Additional specific endpoint of the request.
   * @param resource Object that needed info for the update.
   * @param id Unique value from the object it wants to be retrieved.
   * @returns Promise that if resolved, will return call response.
   */
  protected async update(endpoint: string, resource: any, id?: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers),
      response = this.http.put(id? `${this.url}${endpoint}/${encodeURIComponent(id)}`:`${this.url}${endpoint}`, JSON.stringify(resource),  { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      );
      return await lastValueFrom(response);
  }

  /**
   * Performs a DELETE call to {url}{endpoint}/{id} in order to remove an object.
   * @param endpoint Additional specific endpoint of the request.
   * @param id Unique value from the object specified.
   * @returns Promise that if resolved, will return call response.
   */
  protected async delete(endpoint: string, id: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders(this.headers),
      response = this.http.delete(`${this.url}${endpoint}/${encodeURIComponent(id)}`,  { headers })
      .pipe(
        timeout(10000),
        catchError((err) => this.handleError(err))
      );
      return await lastValueFrom(response);
  }

  /**
   * Function that handles several different errors.
   * @param error error from response.
   */
  private handleError(error: Response): Observable<any> {
    if (error instanceof TimeoutError) {
      return throwError(new ApiErrorTimeOut());
    } else if (error.status === 400) {
      return throwError(new ApiErrorBadInput(error.json()));
    } else if (error.status === 404) {
      return throwError(new ApiErrorNotFound());
    } else {
      return throwError(new ApiError(error));
    }
  }

}