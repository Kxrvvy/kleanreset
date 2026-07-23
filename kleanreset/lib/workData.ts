// lib/workData.ts
//
// "Our Work" feed data. `photos` holds full public-relative paths (leading
// slash, e.g. "/ourWork/Work1/1.jpg") — rendered as-is by the components,
// so each job's images can live anywhere under public/.

export type WorkJob = {
  id: string;
  caption: string;
  photos: string[];
};

export const workJobs: WorkJob[] = [
  /*{
    id: "job-1",
    caption: "2-bed condo deep clean — downtown Edmonton",
    photos: ["/work/job1-a.jpg"],
  },
  {
    id: "job-2",
    caption: "Move-out clean — Windermere townhouse",
    photos: ["/work/job2-a.jpg", "/work/job2-b.jpg"],
  },*/

  {
    id: "job-1",
    caption: "✨ Before & After Carpet Steam Cleaning — deep steam cleaning that removes dirt, stains, odors & allergens, safe for kids & pets ✅",
    photos: [
      "/ourWork/Work1/1.jpg",
      "/ourWork/Work1/2.jpg",
      "/ourWork/Work1/3.jpg",
    ],
  },

  {
    id: "job-2",
    caption: "✨ Another successful commercial deep cleaning — restoring high-traffic floors with detailed, reliable, professional service ✔️",
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
    id: "job-3",
    caption: "🧼✨ Another satisfied client — a full home deep clean leaving every corner fresh, spotless, and refreshed 🏡💙",
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
];
