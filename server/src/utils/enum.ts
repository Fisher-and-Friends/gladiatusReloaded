export function enumToList(
  enumParam: Record<string, string | number>
): [string, ...string[]] {
  if (!enumParam) {
    return ['none'];
  }

  return ['none', ...Object.values(enumParam).map(String)];
}
