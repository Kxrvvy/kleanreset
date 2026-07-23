// lib/bookingSchema.ts
//
// The zod schema = the RUNTIME rules for a valid booking.
// Your types/booking.ts describes the shape at COMPILE time (TypeScript).
// This describes the same shape at RUN time, and validates real input.
// The form uses it to show errors; the API route will reuse it to reject
// bad data. Write the rules once, enforce them everywhere.

import { z } from "zod";

// ── Small enums ──────────────────────────────────────────────
// z.enum([...]) is zod's version of a string-literal union.
// It both types the value AND rejects anything not in the list at runtime.

export const categorySchema = z.enum([
    "residential",
    "commercial",
    "vacation_rental",
]);

export const serviceSchema = z.enum([
    "standard",
    "deep",
    "carpet",
    "turnover",
    "commercial_clean",
]);

export const extraSchema = z.enum([
    "window",
    "wall",
    "stair",
    "refrigerator",
    "decluttering",
    "high_dusting",
]);

export const provinceSchema = z.enum([
    "AB", "BC", "MB", "NB", "NL", "NS", "NT",
    "NU", "ON", "PE", "QC", "SK", "YT",
]);

export const accessMethodSchema = z.enum([
    "someone_there", "key_under_mat", "smartlock",
    "lockbox", "reception", "meet_outside", "other",
]);

export const frequencySchema = z.enum([
    "one_time", "weekly", "bi_weekly", "monthly",
]);

// ── Shared sections ──────────────────────────────────────────
// .min(1, "...") = required, with the message shown to the user if empty.
// .email() = must be a valid email. These messages surface in the UI.

export const contactSchema = z.object({
    fullName: z.string().min(1, "Please enter your name"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(7, "Enter a valid phone number"),
});

export const addressSchema = z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    province: provinceSchema,
    // Canadian postal code, e.g. T5T 3A6. The regex enforces the format.
    postalCode: z
        .string()
        .regex(/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/, "Format: A1A 1A1"),
    landmark: z.string().optional(),
});

// ── Property details: discriminated union ────────────────────
// This is the heart of it. z.discriminatedUnion("kind", [...]) tells zod:
// "look at the `kind` field, then validate against the matching branch."
// A carpet booking is validated ONLY against the carpet shape — it can't
// carry bedrooms. Same guarantee as the TS union, now at runtime.

const residentialProperty = z.object({
    kind: z.literal("residential"),
    propertyType: z.enum(["house", "condo", "apartment", "townhouse"]),
    squareFootage: z.number().positive().optional(),
    bedrooms: z.number().int().min(1),
    bathrooms: z.number().int().min(1),
    floors: z.number().int().min(1),
    hasPets: z.boolean(),
});

const carpetProperty = z.object({
    kind: z.literal("carpet"),
    propertyType: z.enum(["house", "condo", "apartment", "townhouse"]),
    squareFootage: z.number().positive().optional(),
    rooms: z.number().int().min(1, "At least one room"), // drives price
    hasStairs: z.boolean(),
    floors: z.number().int().min(1),
    hasPets: z.boolean(),
    description: z.string().optional(),
});

const commercialProperty = z.object({
    kind: z.literal("commercial"),
    businessName: z.string().min(1, "Business name is required"),
    businessType: z.enum(["office", "retail", "clinic", "restaurant", "warehouse"]),
    buildingSize: z.number().positive("Enter building size in sq ft"),
    floors: z.number().int().min(1),
    restrooms: z.number().int().min(0),
    meetingRooms: z.number().int().min(0),
    frequency: frequencySchema,
    hasReception: z.boolean(),
    hasKitchen: z.boolean(),
    hasBathroom: z.boolean(),
    parkingAvailable: z.boolean(),
});

const vacationRentalProperty = z.object({
    kind: z.literal("vacation_rental"),
    propertyType: z.enum(["house", "condo", "apartment", "townhouse"]),
    squareFootage: z.number().positive().optional(),
    bedrooms: z.number().int().min(1),
    bathrooms: z.number().int().min(1),
    guestCapacity: z.number().int().min(1),
    guestCheckoutTime: z.string().optional(),
    nextCheckinTime: z.string().optional(),
    linenReplacement: z.boolean(),
    towelReplacement: z.boolean(),
    supplyRestocking: z.boolean(),
});

export const propertySchema = z.discriminatedUnion("kind", [
    residentialProperty,
    carpetProperty,
    commercialProperty,
    vacationRentalProperty,
]);

// ── The whole booking ────────────────────────────────────────

export const bookingSchema = z.object({
    category: categorySchema,
    service: serviceSchema,
    contact: contactSchema,
    address: addressSchema,
    property: propertySchema,
    extras: z.array(extraSchema),
    schedule: z.object({
        date: z.string().min(1, "Pick a preferred date"),
        arrivalTime: z.string().min(1, "Pick a preferred time"),
    }),
    access: z.object({
        method: accessMethodSchema,
        parkingInfo: z.string().optional(),
        buildingInstructions: z.string().optional(),
        gateCode: z.string().optional(),
    }),
    notes: z.string().optional(),
    consent: z.object({
        // .literal(true) = MUST be true. An unchecked box fails validation.
        terms: z.literal(true, { message: "You must agree to the Terms" }),
        privacy: z.literal(true, {
            message: "You must agree to the Privacy Policy",
        }),
    }),
});

// zod can DERIVE the TypeScript type from the schema. This gives us a
// form-input type that always matches the validation rules automatically.
export type BookingFormValues = z.infer<typeof bookingSchema>;

// ── Contact page submission ──────────────────────────────────
// Reuses the same name/email/phone rules as a booking's contact section,
// plus the free-text message. Mirrors types/booking.ts ContactPayload.

export const contactPayloadSchema = contactSchema.extend({
  message: z.string().min(1, "Please enter a message"),
  submittedAt: z.string().min(1),
});

export type ContactFormValues = z.infer<typeof contactPayloadSchema>;