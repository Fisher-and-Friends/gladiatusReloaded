import { Type } from 'typescript';

function getEnv(key: string, type: 'string'): string;
function getEnv(key: string, type: 'number'): number;
function getEnv(key: string, type: 'boolean'): boolean;
function getEnv(key: string, type: 'string' | 'number' | 'boolean'): any {
  if (!key?.length) {
    throw new Error(`Invalid environment variable key.`);
  }
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Not found environment variable ${key}.`);
  }

  switch (type) {
    case 'string':
      return `${value}`;
    case 'number':
      return +value;
    case 'boolean':
      return !!value;
    default:
      return `${value}`;
  }
}

export { getEnv };
