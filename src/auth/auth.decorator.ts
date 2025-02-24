import { SetMetadata } from '@nestjs/common';

export const Auth = (...args: string[]) => SetMetadata('auth', args);
export const IS_PUBLIC_KEY = Symbol('auth_is_public');
export const AuthPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
