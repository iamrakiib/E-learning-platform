export class ResponseUtil {
  static success<T>(data: T, message = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(statusCode: number, message: string, errors?: any) {
    return {
      success: false,
      statusCode,
      message,
      errors,
    };
  }
}