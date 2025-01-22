import { Request } from 'express';

export function exctractTokenFromHeader(request: Request) {
  const authHeader = request.headers.authorization;
  if (!authHeader) return null;

  const [type, token] = request.headers.authorization.split(' ') ?? [];
  return type == 'Bearer' ? token : null;
}
