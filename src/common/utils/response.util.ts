import { ResponseDto } from '../dto/response.dto';

export function createResponse<T>(
  data: T,
  errmsg: string = 'success',
): ResponseDto<T> {
  return new ResponseDto<T>(200, errmsg, data);
}
