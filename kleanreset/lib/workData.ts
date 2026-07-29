// lib/workData.ts
//
// "Our Work" portfolio data — real completed cleaning projects. Descriptions
// stay factual (what was cleaned); no customer-satisfaction claims unless the
// business provides a genuine testimonial. `photos` are public-relative paths.
// Add new projects/categories here as real work becomes available.

export type WorkCategory = "residential" | "deep" | "commercial";

export type WorkProject = {
  id: string;
  category: WorkCategory;
  title: string;
  description: string;
  areas: string[];
  photos: string[];
};

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  residential: "Residential",
  deep: "Deep Cleaning",
  commercial: "Commercial",
};

export const workProjects: WorkProject[] = [
  {
    id: "job-4",
    category: "residential",
    title: "Residential Cleaning",
    description:
      "A completed residential cleaning covering the living room, kitchen, appliances, and common areas.",
    areas: ["Kitchen", "Living Room", "Appliances", "Common Areas"],
    photos: [
      "/ourWork/Work4/1.jpg",
      "/ourWork/Work4/2.jpg",
      "/ourWork/Work4/3.jpg",
      "/ourWork/Work4/4.jpg",
      "/ourWork/Work4/5.jpg",
      "/ourWork/Work4/6.jpg",
      "/ourWork/Work4/7.jpg",
      "/ourWork/Work4/8.jpg",
      "/ourWork/Work4/9.jpg",
      "/ourWork/Work4/10.jpg",
    ],
  },
  {
    id: "job-3",
    category: "deep",
    title: "Deep Cleaning",
    description:
      "A detailed deep clean focused on the kitchen, appliances, and high-use areas throughout the home.",
    areas: ["Kitchen", "Living Room", "Appliances", "High-Use Areas"],
    photos: [
      "/ourWork/Work2/1.jpg",
      "/ourWork/Work2/2.jpg",
      "/ourWork/Work2/3.jpg",
      "/ourWork/Work2/4.jpg",
      "/ourWork/Work2/5.jpg",
      "/ourWork/Work2/6.jpg",
      "/ourWork/Work2/7.jpg",
      "/ourWork/Work2/8.jpg",
      "/ourWork/Work2/9.jpg",
      "/ourWork/Work2/10.jpg",
      "/ourWork/Work2/11.jpg",
      "/ourWork/Work2/12.jpg",
      "/ourWork/Work2/13.jpg",
      "/ourWork/Work2/14.jpg",
      "/ourWork/Work2/15.jpg",
      "/ourWork/Work2/16.jpg",
      "/ourWork/Work2/17.jpg",
      "/ourWork/Work2/18.jpg",
    ],
  },
  {
    id: "job-2",
    category: "commercial",
    title: "Commercial Cleaning",
    description:
      "A commercial cleaning restoring high-traffic floors and shared common areas.",
    areas: ["Floors", "High-Traffic Areas", "Common Areas"],
    photos: [
      "/ourWork/Work3/1.jpg",
      "/ourWork/Work3/2.jpg",
      "/ourWork/Work3/3.jpg",
      "/ourWork/Work3/4.jpg",
      "/ourWork/Work3/5.jpg",
      "/ourWork/Work3/6.jpg",
      "/ourWork/Work3/7.jpg",
      "/ourWork/Work3/8.jpg",
      "/ourWork/Work3/9.jpg",
      "/ourWork/Work3/10.jpg",
      "/ourWork/Work3/11.jpg",
      "/ourWork/Work3/12.jpg",
      "/ourWork/Work3/13.jpg",
      "/ourWork/Work3/14.jpg",
      "/ourWork/Work3/15.jpg",
      "/ourWork/Work3/16.jpg",
      "/ourWork/Work3/17.jpg",
      "/ourWork/Work3/18.jpg",
      "/ourWork/Work3/19.jpg",
      "/ourWork/Work3/20.jpg",
      "/ourWork/Work3/21.jpg",
      "/ourWork/Work3/22.jpg",
      "/ourWork/Work3/23.jpg",
      "/ourWork/Work3/24.jpg",
      "/ourWork/Work3/25.jpg",
      "/ourWork/Work3/26.jpg",
    ],
  },
  {
    id: "job-1",
    category: "residential",
    title: "Carpet Steam Cleaning",
    description:
      "A residential carpet steam clean that lifts dirt, stains, and odours from carpets and high-traffic areas.",
    areas: ["Carpets", "High-Traffic Areas"],
    photos: [
      "/ourWork/Work1/1.jpg",
      "/ourWork/Work1/2.jpg",
      "/ourWork/Work1/3.jpg",
    ],
  },
];
