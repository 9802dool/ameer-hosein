export type Quote = {
  id: string;
  quote: string;
  name: string;
  detail: string;
};

export type StudentFilm = {
  id: string;
  title: string;
  poster: string;
  posterAlt: string;
  embedUrl: string;
  mp4: string;
  caption: string;
};

export const quotes: Quote[] = [
  {
    id: "david-reid",
    quote: "The best in the business.",
    name: "David Reid",
    detail: "Placeholder credit. Add David Reid's title here.",
  },
];

export const studentFilms: StudentFilm[] = [
  {
    id: "film-1",
    title: "Student story",
    poster: "/images/testimonial-01.jpg",
    posterAlt: "Placeholder poster for a student testimonial film.",
    embedUrl: "",
    mp4: "",
    caption: "Add an Instagram Reel URL or an MP4 in this entry.",
  },
];
