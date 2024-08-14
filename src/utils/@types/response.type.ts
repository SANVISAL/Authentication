export interface ApiResponse<T> {
  code: string | "";
  message: string;
  result: T | null;
}
