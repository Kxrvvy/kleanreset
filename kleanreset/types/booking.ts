// types/booking.ts
//
// Single source of truth for a booking submission.
// Form writes it, summary reads it, API validates it, emails render it.

import type { Estimate } from "@/lib/pricing";

// ── Building-block unions ────────────────────────────────────

export type Category = "residential" | "commercial" | "vacation_rental";

// Services offered IN THE BOOKING FORM. Move-in/out and decluttering are
// NOT here — those are general inquiries via the Contact page.
// Dental is not separate — it's commercial with businessType "clinic".
export type ServiceId =
  | "standard"
  | "deep"
  | "carpet"
  | "turnover"
  | "commercial_clean";

export type ExtraId =
  | "window"
  | "wall"
  | "stair"
  | "refrigerator"
  | "decluttering"
  | "high_dusting";

export type AccessMethod =
  | "someone_home"
  | "key_under_mat"
  | "smartlock"
  | "lockbox"
  | "reception"
  | "meet_outside"
  | "other";

export type CleaningFrequency =
  | "one_time"
  | "weekly"
  | "bi_weekly"
  | "monthly";

export type Province =
  | "AB" | "BC" | "MB" | "NB" | "NL" | "NS" | "NT"
  | "NU" | "ON" | "PE" | "QC" | "SK" | "YT";

// ── Shared sections ──────────────────────────────────────────

export interface Contact {
  fullName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  province: Province;
  postalCode: string; // A1A 1A1
  landmark?: string;
}

// ── Property details: discriminated union on `kind` ──────────
//
// Four shapes now. Carpet is its own branch because selecting Carpet
// swaps out beds/baths for room-count fields (and room count drives price).

export type ResidentialProperty = {
  kind: "residential";
  propertyType: "house" | "condo" | "apartment" | "townhouse";
  squareFootage?: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  hasPets: boolean;
};

// Carpet: keeps type/sqft/floors/pets, replaces beds/baths with rooms.
// `rooms` includes stairs and hallways (each counts as one room).
export type CarpetProperty = {
  kind: "carpet";
  propertyType: "house" | "condo" | "apartment" | "townhouse";
  squareFootage?: number;
  rooms: number;        // drives price: rooms × $55
  hasStairs: boolean;
  floors: number;
  hasPets: boolean;
  description?: string; // "describe your carpets" free text
};

// Commercial. Dental/clinic jobs use businessType "clinic".
export type CommercialProperty = {
  kind: "commercial";
  businessName: string;
  businessType: "office" | "retail" | "clinic" | "restaurant" | "warehouse";
  buildingSize: number; // sq ft
  floors: number;
  restrooms: number;
  meetingRooms: number;
  frequency: CleaningFrequency;
  hasReception: boolean;
  hasKitchen: boolean;
  parkingAvailable: boolean;
};

export type VacationRentalProperty = {
  kind: "vacation_rental";
  propertyType: "house" | "condo" | "apartment" | "townhouse";
  squareFootage?: number;
  bedrooms: number;
  bathrooms: number;
  guestCapacity: number;
  guestCheckoutTime?: string;
  nextCheckinTime?: string;
  linenReplacement: boolean;
  towelReplacement: boolean;
  supplyRestocking: boolean;
};

export type PropertyDetails =
  | ResidentialProperty
  | CarpetProperty
  | CommercialProperty
  | VacationRentalProperty;

// ── Full booking payload ─────────────────────────────────────

export interface BookingPayload {
  category: Category;
  service: ServiceId;
  contact: Contact;
  address: Address;
  property: PropertyDetails;
  extras: ExtraId[];
  schedule: {
    date: string;        // ISO date
    arrivalTime: string; // "HH:mm"
  };
  access: {
    method: AccessMethod;
    parkingInfo?: string;
    buildingInstructions?: string;
    gateCode?: string;
  };
  notes?: string;
  consent: {
    terms: boolean;
    privacy: boolean;
  };
  meta: {
    submittedAt: string;
    estimate: Estimate;
  };
}

// ── Contact page submission (separate, general-purpose) ──────
//
// Not tied to any service. Handles any inquiry: move-in/out,
// decluttering, dental questions, quote clarifications, etc.

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  message: string;       // "what they want cleaned" / any question
  submittedAt: string;
}