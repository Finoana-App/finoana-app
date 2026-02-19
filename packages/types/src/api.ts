import { z } from 'zod';

/**
 * Standardized API error shape
 */
export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  statusCode: z.number(),
  responseObject: z.null(),
});

/**
 * API error response type
 */
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

/**
 * Standardized API success shape
 */
export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    statusCode: z.number(),
    responseObject: dataSchema,
  });

/**
 * API success response type (generic)
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  statusCode: number;
  responseObject: T;
}

/**
 * Union of success/error API responses
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Service response schema builder (for backend validation)
 */
export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional().nullable(),
    statusCode: z.number(),
  });

/**
 * Common ID validation
 */
export const IdParamSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Route param schemas for user endpoints
 */
export const GetUserSchema = z.object({
  params: IdParamSchema,
});
