import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'super-secret',
  expiresIn: process.env.JWT_EXPIRATION_TIME || '24h',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-super-secret',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME || '7d',
}));