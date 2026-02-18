import { UserRepository } from '../user.repository';

class UserUtils {
  private readonly userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async generateUniqueUsername(firstName: string, familyName: string, maxAttempts = 8): Promise<string> {
    const f = firstName.toLowerCase().replaceAll(/\s+/g, '').trim();
    const l = familyName.toLowerCase().replaceAll(/\s+/g, '').trim();

    if (!f && !l) {
      return `user_${Math.random().toString(36).slice(2, 9)}`;
    }

    const patterns: string[] = [];

    if (l) {
      patterns.push(`${f}.${l.charAt(0)}`);
      patterns.push(`${f}${l}`);
      patterns.push(`${f}.${l}`);
      patterns.push(`${f}${l.charAt(0)}`);
      patterns.push(`${f.slice(0, 8)}${l.slice(0, 8)}`);
    } else if (f) {
      patterns.push(f);
      patterns.push(`${f}mg`);
    } else {
      patterns.push(l);
    }

    for (const base of patterns) {
      if (base.length >= 4 && !(await this.userRepository.usernameExists(base))) {
        return base;
      }
    }

    const bestBase = patterns[0] || f || l || 'user';
    for (let i = 2; i <= maxAttempts + 1; i++) {
      const candidate = `${bestBase}${i}`;
      if (!(await this.userRepository.usernameExists(candidate))) {
        return candidate;
      }
    }

    const prefix = (f || l || 'user').slice(0, 7);
    const random = Math.random().toString(36).slice(2, 8);
    return `${prefix}${random}`;
  }
}

export const userUtils = new UserUtils();
