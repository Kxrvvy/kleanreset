// emails/bookingNotification.ts
//
// Sent to Kleanreset when a booking request comes in. Full detail,
// nothing summarized — a human decides what to do with this.

import type { BookingPayload, PropertyDetails, ExtraId } from "@/types/booking";
import type { Estimate } from "@/lib/pricing";
import { emailShell, sectionHeading, detailTable, detailRow, calloutBox, escapeHtml } from "@/emails/layout";

const CATEGORY_LABEL: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  vacation_rental: "Vacation Rental",
};

const SERVICE_LABEL: Record<string, string> = {
  standard: "Standard Cleaning",
  deep: "Deep Cleaning",
  carpet: "Carpet Cleaning",
  turnover: "Airbnb Turnover",
  commercial_clean: "Commercial Cleaning",
};

const EXTRA_LABEL: Record<ExtraId, string> = {
  window: "Window cleaning",
  wall: "Wall cleaning",
  stair: "Stair cleaning",
  refrigerator: "Refrigerator interior",
  decluttering: "Decluttering",
  high_dusting: "High dusting",
};

const ACCESS_LABEL: Record<string, string> = {
  someone_there: "Someone will be there",
  key_under_mat: "Key under mat",
  smartlock: "Smart lock",
  lockbox: "Lockbox",
  reception: "Front desk / reception",
  meet_outside: "Meet outside",
  other: "Other (see notes)",
};

function propertyRows(property: PropertyDetails): string {
  switch (property.kind) {
    case "residential":
      return detailTable(
        detailRow("Property type", capitalize(property.propertyType)) +
          (property.squareFootage ? detailRow("Square footage", `${property.squareFootage} sq ft`) : "") +
          detailRow("Bedrooms", String(property.bedrooms)) +
          detailRow("Bathrooms", String(property.bathrooms)) +
          detailRow("Floors", String(property.floors)) +
          detailRow("Pets on site", property.hasPets ? "Yes" : "No")
      );
    case "carpet":
      return detailTable(
        detailRow("Property type", capitalize(property.propertyType)) +
          (property.squareFootage ? detailRow("Square footage", `${property.squareFootage} sq ft`) : "") +
          detailRow("Rooms (incl. stairs/hallways)", String(property.rooms)) +
          detailRow("Has stairs", property.hasStairs ? "Yes" : "No") +
          detailRow("Floors", String(property.floors)) +
          detailRow("Pets on site", property.hasPets ? "Yes" : "No") +
          (property.description ? detailRow("Carpet description", property.description) : "")
      );
    case "commercial":
      return detailTable(
        detailRow("Business name", property.businessName) +
          detailRow("Business type", capitalize(property.businessType)) +
          detailRow("Building size", `${property.buildingSize} sq ft`) +
          detailRow("Floors", String(property.floors)) +
          detailRow("Restrooms", String(property.restrooms)) +
          detailRow("Meeting rooms", String(property.meetingRooms)) +
          detailRow("Frequency", capitalize(property.frequency).replace(/_/g, "-")) +
          detailRow("Reception area", property.hasReception ? "Yes" : "No") +
          detailRow("Kitchen on site", property.hasKitchen ? "Yes" : "No") +
          detailRow("Bathroom on site", property.hasBathroom ? "Yes" : "No") +
          detailRow("Parking available", property.parkingAvailable ? "Yes" : "No")
      );
    case "vacation_rental":
      return detailTable(
        detailRow("Property type", capitalize(property.propertyType)) +
          (property.squareFootage ? detailRow("Square footage", `${property.squareFootage} sq ft`) : "") +
          detailRow("Bedrooms", String(property.bedrooms)) +
          detailRow("Bathrooms", String(property.bathrooms)) +
          detailRow("Guest capacity", String(property.guestCapacity)) +
          (property.guestCheckoutTime ? detailRow("Guest checkout time", property.guestCheckoutTime) : "") +
          (property.nextCheckinTime ? detailRow("Next check-in time", property.nextCheckinTime) : "") +
          detailRow("Linen replacement", property.linenReplacement ? "Yes" : "No") +
          detailRow("Towel replacement", property.towelReplacement ? "Yes" : "No") +
          detailRow("Supply restocking", property.supplyRestocking ? "Yes" : "No")
      );
  }
}

function estimateHtml(estimate: Estimate): string {
  if (estimate.mode === "quote") {
    return calloutBox(
      `<p style="margin:0;font-size:13px;font-weight:700;color:#0E4D3C;">Quote required</p>
       <p style="margin:4px 0 0;font-size:13px;color:#4C5A52;">${escapeHtml(estimate.reason)}</p>`
    );
  }
  const money = (n: number) => `$${n.toFixed(2)} CAD`;
  return calloutBox(
    detailTable(
      (estimate.hours !== undefined ? detailRow("Estimated hours", `${estimate.hours} hrs`) : "") +
        detailRow("Subtotal", money(estimate.subtotal)) +
        detailRow("GST (5%)", money(estimate.tax)) +
        detailRow(estimate.isRough ? "Estimated total" : "Total", money(estimate.total))
    ) + (estimate.note ? `<p style="margin:8px 0 0;font-size:12px;color:#4C5A52;">${escapeHtml(estimate.note)}</p>` : "")
  );
}

export function bookingNotificationEmail(payload: BookingPayload): { subject: string; html: string } {
  const { category, service, contact, address, property, extras, schedule, access, notes, meta } = payload;

  const bodyHtml = `
    ${sectionHeading("Category & Service")}
    ${detailTable(
      detailRow("Category", CATEGORY_LABEL[category] ?? category) +
        detailRow("Service", SERVICE_LABEL[service] ?? service)
    )}

    ${sectionHeading("Contact")}
    ${detailTable(
      detailRow("Name", contact.fullName) +
        detailRow("Email", contact.email) +
        detailRow("Phone", contact.phone)
    )}

    ${sectionHeading("Address")}
    ${detailTable(
      detailRow("Street", address.street) +
        detailRow("City", address.city) +
        detailRow("Province", address.province) +
        detailRow("Postal code", address.postalCode) +
        (address.landmark ? detailRow("Landmark", address.landmark) : "")
    )}

    ${sectionHeading("Property details")}
    ${propertyRows(property)}

    ${sectionHeading("Extras")}
    ${
      extras.length
        ? detailTable(detailRow("Requested", extras.map((id) => EXTRA_LABEL[id]).join(", ")))
        : `<p style="margin:0;font-size:13px;color:#4C5A52;">None selected</p>`
    }

    ${sectionHeading("Preferred schedule")}
    ${detailTable(
      detailRow("Preferred date", schedule.date) + detailRow("Preferred arrival time", schedule.arrivalTime)
    )}

    ${sectionHeading("Access info")}
    ${detailTable(
      detailRow("Method", ACCESS_LABEL[access.method] ?? access.method) +
        (access.parkingInfo ? detailRow("Parking info", access.parkingInfo) : "") +
        (access.buildingInstructions ? detailRow("Building instructions", access.buildingInstructions) : "") +
        (access.gateCode ? detailRow("Gate code", access.gateCode) : "")
    )}

    ${
      notes
        ? sectionHeading("Notes") + `<p style="margin:0;font-size:13px;color:#10241C;white-space:pre-wrap;">${escapeHtml(notes)}</p>`
        : ""
    }

    ${sectionHeading("Estimate")}
    ${estimateHtml(meta.estimate)}
  `;

  return {
    subject: `New booking request — ${SERVICE_LABEL[service] ?? service} (${contact.fullName})`,
    html: emailShell({
      heading: "New booking request",
      preheader: `${SERVICE_LABEL[service] ?? service} for ${contact.fullName} on ${schedule.date}`,
      bodyHtml,
    }),
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
