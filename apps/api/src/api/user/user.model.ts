import { z } from 'zod';

import { commonValidations } from '@/common/utils/common-validation';

/**
 * Extended schema for route params with custom ID validation
 */
export const GetUserSchemaExtended = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type {
  User,
  UserRole,
  PrivacyLevel,
  RegisterInput,
  UpdateProfileInput,
  UpdateRoleInput,
} from '@workspace/types';

export {
  UserRoleEnum,
  PrivacyLevelEnum,
  UserSchema,
  RegisterInputSchema,
  UpdateProfileSchema,
  UpdateRoleSchema,
  GetUserSchema,
} from '@workspace/types';
