import feed from "./instagram.json";

export type InstagramPost = {
  id: string;
  image: string;
  alt: string;
  href: string;
};

export const instagramPosts = feed as InstagramPost[];
