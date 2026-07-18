import type { Estimate } from "@/lib/pricing";

export type Category = "residential" | "commercial" | "vacation_rental";

export type ServiceID = 
    | "standard" 
    | "deep" 
    | "carpet"
    | "commercial_clean" 
    | "turnover";

export type ExtraID = 
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

export type Province =
  | "AB" | "BC" | "MB" | "NB" | "NL" | "NS" | "NT"
  | "NU" | "ON" | "PE" | "QC" | "SK" | "YT";



export interface Contact {
    fullName: string;
    email: string;
    phone: string;
}

export interface Address {
    streetAddress: string;
    city: string;
    province: Province;
    postalCode: string;
    Landmark?: string;
}

export type ResidentialProperty = {
    kind: "residential";
    propertyType: "house" | "apartment" | "condo" | "townhouse";
    squareFootage?: number;
    bedrooms: number;
    bathrooms: number;
    floors: number;
};

export type CommercialProperty = {
    kind: "commercial";
    buildingType: "office" | "retail" | "warehouse" | "restaurant" | "other";
    businessName: string;
    buildingSize?: number; // in square feet
    floors: number;
    meetingRooms?: number;
    cleaningFrequency?: "one-time" | "daily" | "weekly" | "biweekly" | "monthly";
    hasReception: boolean;
    hasKitchen: boolean;
    parkingAvailable: boolean;
}

export type VacationRentalProperty = {
    kind: "vacation_rental";
    propertyType: "house" | "apartment" | "condo" | "cabin" | "townhouse";
    propertySize?: number; // in square feet
    bedrooms: number;
    bathrooms: number;
    guestCapacity: number;
    guestCheckoutTime?: string; // "HH:mm"
    nextCheckinTime?: string;   // "HH:mm"
    linenReplacement: boolean;
    towelReplacement: boolean;
    supplyRestocking: boolean;
};

export type PropertyDetails =
    | ResidentialProperty
    | CommercialProperty
    | VacationRentalProperty;


export interface Booking {
    category: Category;
    contact: Contact;
    address: Address;
    service: ServiceID;
    property: PropertyDetails;
    schedule: {
        date: string;            // ISO date, e.g. "2026-07-25"
        arrivalTime: string;     // ISO time, e.g. "14:30"
    };
    access: {
        method: AccessMethod;
        parkingInstructions?: string;
        buildingInstructions?: string;
    };
    notes?: string;
    consent: {
        terms: boolean;
        privacy: boolean;
    };
    meta: {
        submittedAt: string; // ISO date-time, e.g. "2026-07-25T14:30:00Z"
        estimate: Estimate;
    }

}
    
