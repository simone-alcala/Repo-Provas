import * as throwError from '../utils/errorUtils';

export default function (data: number, message?: string) {
  if (isNaN(data)) {
    throw throwError.notFound(message || 'Id not found');
  }
}