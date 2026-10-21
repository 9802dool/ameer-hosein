import { z } from "zod";

export const enrolSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(120),
  payment: z.enum(["plan", "full"]),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(120),
  subject: z.enum(["Course", "Photoshoot", "Brand collab", "Other"]),
  message: z.string().trim().min(10).max(2000),
});

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  brand: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),
  message: z.string().trim().min(10).max(2000),
});

export const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(120),
  method: z.enum(["delivery", "pickup"]),
  areaId: z.string().trim().max(40).optional(),
  address: z.string().trim().max(240).optional(),
  paymentMethod: z.enum(["card", "transfer", "cash"]),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1).max(40),
        variantId: z.string().trim().min(1).max(60),
        quantity: z.number().int().min(1).max(10),
      }),
    )
    .min(1)
    .max(20),
});

export type FieldErrors = Record<string, string[] | undefined>;
