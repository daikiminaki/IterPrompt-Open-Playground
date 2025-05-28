import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodTypeAny } from "zod";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonToZodSchema(value: any): ZodTypeAny {
  if (value === null) {
    return z.null();
  }
  switch (typeof value) {
    case 'string':
      return z.string();
    case 'number':
      return z.number();
    case 'boolean':
      return z.boolean();
    case 'object':
      if (Array.isArray(value)) {
        const inner = value.length > 0
          ? jsonToZodSchema(value[0])
          : z.any();
        return z.array(inner);
      } else {
        const shape: Record<string, ZodTypeAny> = {};
        for (const key of Object.keys(value)) {
          shape[key] = jsonToZodSchema(value[key]);
        }
        return z.object(shape);
      }
    default:
      return z.any();
  }
}


export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");