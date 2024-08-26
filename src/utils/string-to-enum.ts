export function stringToEnum<T>(
  enumObj: T,
  value: string
): T[keyof T] | undefined {
  return (enumObj as any)[value];
}
