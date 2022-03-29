import * as bcrypt from 'bcryptjs';

export class BcryptProvider {
  createHash(text: string): string {
    return bcrypt.hash(text, 10);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
