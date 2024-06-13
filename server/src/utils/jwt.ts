import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function base64decode<T>(data: string): T {
  try {
    return <T>JSON.parse(atob(data));
  } catch (error) {
    console.error(error, data);
    throw new Error('Invalid base64 object.');
  }
}

export function decodeJWT<T>(token: string): T {
  try {
    return base64decode<T>(token?.split('.')[1]);
  } catch (error) {
    console.error(error, token);
    throw new Error('Invalid JWT token.');
  }
}

/**
 *
 * @param sign - function which creates the token
 * @param data - the data to include in the token
 * @param lifetime - the lifetime of the token in hours
 */
export async function createCookie(
  sign: (data: any) => Promise<string>,
  data: any,
  lifetime: number
) {
  const expires = dayjs().add(lifetime, 'hour').unix();
  const userToken = await sign({
    ...data,
    expires,
  });

  return {
    value: userToken,
    expires: new Date(expires * 1000),
  };
}
