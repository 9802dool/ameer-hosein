export const fundamentals = {
  slug: "fundamentals",
  name: "The Fundamentals of Photography",
  shortName: "FOP",
  eyebrow: "Flagship course",
  summary: "The most well rounded photography course.",
  overview: [
    "This is the class I wish I could have taken at the start. We build the camera from the ground up, then we put you in the light with people, and we finish in the edit so the picture can leave your phone and do some work.",
    "You will cover camera fundamentals, lighting, post-production retouching, working with professional models, and turning a photography passion into a profitable career.",
  ],
  covers: [
    "Camera fundamentals",
    "Lighting",
    "Post-production retouching",
    "Working with professional models",
    "Turning a passion into a profitable career",
  ],
  price: 2000,
  currency: "TTD",
  paymentPlans: true,
  schedule: "6 Saturdays, 9:00am to 12:00pm",
  venue: "Plaza De Montrose, Chaguanas",
  certificate: true,
  materialsIncluded: true,
  limited: "Limited spaces each cycle",
  nextCycleStarts: "7 November 2026",
  image: "/images/ig/ig-class-a.jpg",
  imageAlt: "Ameer Hosein presenting a Fundamentals of Photography certificate.",
  detailImage: "/images/ig/ig-class-b.jpg",
  detailImageAlt: "Ameer Hosein with a Fundamentals of Photography graduate.",
  faq: [
    {
      question: "Don't have a camera?",
      answer: "You can use mine.",
    },
    {
      question: "Don't have a laptop?",
      answer: "Lightroom works on mobile too.",
    },
    {
      question: "Where and when do we meet?",
      answer: "Six Saturdays, 9:00am to 12:00pm, at Plaza De Montrose in Chaguanas.",
    },
    {
      question: "What do I leave with?",
      answer:
        "A certificate, the course materials, and a way of seeing that you can take into paid work.",
    },
  ],
  enrolWhatsapp:
    "Hi Ameer, I want to join the next Fundamentals of Photography class.",
} as const;

export const proClass = {
  name: "Pro Class",
  edition: "Advanced Edition",
  eyebrow: "FOP graduates only",
  summary:
    "The advanced room is for people who have already finished The Fundamentals of Photography.",
  overview: [
    "You know the camera. Pro Class asks you to use it when the clock is running and the frame has to hold up.",
    "The centrepiece is the 10-minute pro challenge: wide, half-body, full-body, beauty, and a surprise-me frame. Graduate work from that set lives on this page.",
  ],
  challenge: [
    {
      title: "Wide",
      image: "/images/challenge-wide.jpg",
      alt: "Placeholder for a wide frame from the 10-minute pro challenge.",
    },
    {
      title: "Half-body",
      image: "/images/challenge-half.jpg",
      alt: "Placeholder for a half-body frame from the pro challenge.",
    },
    {
      title: "Full-body",
      image: "/images/challenge-full.jpg",
      alt: "Placeholder for a full-body frame from the pro challenge.",
    },
    {
      title: "Beauty",
      image: "/images/challenge-beauty.jpg",
      alt: "Placeholder for a beauty frame from the pro challenge.",
    },
    {
      title: "Surprise me",
      image: "/images/challenge-surprise.jpg",
      alt: "Placeholder for the surprise frame from the pro challenge.",
    },
  ],
  image: "/images/pro-class.jpg",
  imageAlt: "Placeholder for a Pro Class graduate set.",
  whatsapp: "Hi Ameer, I am an FOP graduate and I want to know about Pro Class.",
} as const;
