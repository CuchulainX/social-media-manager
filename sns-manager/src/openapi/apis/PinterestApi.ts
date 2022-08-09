/* tslint:disable */
/* eslint-disable */
/**
 * SNS-Manager API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ErrorMessage,
  OAuthToken,
  UnprocessableEntity,
} from '../models';
import {
    ErrorMessageFromJSON,
    ErrorMessageToJSON,
    OAuthTokenFromJSON,
    OAuthTokenToJSON,
    UnprocessableEntityFromJSON,
    UnprocessableEntityToJSON,
} from '../models';

export interface PinterestAuthCallbackCallbackGetRequest {
    state: string;
    code: string;
}

export interface PinterestAuthGetRequest {
    returnTo?: string;
}

/**
 * 
 */
export class PinterestApi extends runtime.BaseAPI {

    /**
     * Callback after login to get access token
     */
    async pinterestAuthCallbackCallbackGetRaw(requestParameters: PinterestAuthCallbackCallbackGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OAuthToken>> {
        if (requestParameters.state === null || requestParameters.state === undefined) {
            throw new runtime.RequiredError('state','Required parameter requestParameters.state was null or undefined when calling pinterestAuthCallbackCallbackGet.');
        }

        if (requestParameters.code === null || requestParameters.code === undefined) {
            throw new runtime.RequiredError('code','Required parameter requestParameters.code was null or undefined when calling pinterestAuthCallbackCallbackGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.state !== undefined) {
            queryParameters['state'] = requestParameters.state;
        }

        if (requestParameters.code !== undefined) {
            queryParameters['code'] = requestParameters.code;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/pinterest/auth/callback`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OAuthTokenFromJSON(jsonValue));
    }

    /**
     * Callback after login to get access token
     */
    async pinterestAuthCallbackCallbackGet(requestParameters: PinterestAuthCallbackCallbackGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OAuthToken> {
        const response = await this.pinterestAuthCallbackCallbackGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Redirects to reddit login
     */
    async pinterestAuthGetRaw(requestParameters: PinterestAuthGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.returnTo !== undefined) {
            queryParameters['return_to'] = requestParameters.returnTo;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/pinterest/auth/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Redirects to reddit login
     */
    async pinterestAuthGet(requestParameters: PinterestAuthGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.pinterestAuthGetRaw(requestParameters, initOverrides);
    }

}
