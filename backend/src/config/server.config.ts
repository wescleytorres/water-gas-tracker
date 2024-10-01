import { registerAs } from '@nestjs/config';

export default registerAs('gemini', () => ({
  gemini_api_key: process.env.GEMINI_API_KEY,
}));
