export function alreadyExists(resource: string): string {
  return `${resource} already exists`;
}
export function notFound(resource: string): string {
  return `${resource} not found`;
}

export const PG_DUPLICATED_ERROR = '23505';