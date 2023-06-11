import { HttpStatus } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiNotImplementedResponse,
  ApiPayloadTooLargeResponse,
  ApiRequestTimeoutResponse,
  ApiServiceUnavailableResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseResult } from '../data/';
import { getBaseResultSchema } from './utils';
export function getDefaultApiResponseDecorators() {
  return [
    ApiInternalServerErrorResponse(
      getBaseResultSchema(HttpStatus.INTERNAL_SERVER_ERROR),
    ),
    ApiNotFoundResponse(getBaseResultSchema(HttpStatus.NOT_FOUND)),
    ApiBadRequestResponse(getBaseResultSchema(HttpStatus.BAD_REQUEST)),
    ApiRequestTimeoutResponse(getBaseResultSchema(HttpStatus.REQUEST_TIMEOUT)),
    ApiForbiddenResponse(getBaseResultSchema(HttpStatus.FORBIDDEN)),
    ApiServiceUnavailableResponse(
      getBaseResultSchema(HttpStatus.SERVICE_UNAVAILABLE),
    ),
    ApiMethodNotAllowedResponse(
      getBaseResultSchema(HttpStatus.METHOD_NOT_ALLOWED),
    ),
    ApiNotImplementedResponse(getBaseResultSchema(HttpStatus.NOT_IMPLEMENTED)),
    ApiTooManyRequestsResponse(
      getBaseResultSchema(HttpStatus.TOO_MANY_REQUESTS),
    ),
    ApiPayloadTooLargeResponse(
      getBaseResultSchema(HttpStatus.PAYLOAD_TOO_LARGE),
    ),
    ApiBadGatewayResponse(getBaseResultSchema(HttpStatus.BAD_GATEWAY)),
    ApiUnauthorizedResponse({ type: BaseResult }),
  ];
}
