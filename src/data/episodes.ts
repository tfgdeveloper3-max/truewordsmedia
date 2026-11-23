export type Episode = {
    id: number;
    title: string;
    description: string;
    image: string;
    audio: string;
    show: string;
    episode: number;
    session: number;
    postedOn: string;
};

export const EPISODES: Episode[] = [
    {
        id: 1,
        title: "Place Your Heading Here",
        description:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here.",
        image: "/images/Episode1.png",
        audio: "/audio/episode-1.mp3",
        show: "Hugh jass Show",
        episode: 1,
        session: 1,
        postedOn: "November 20, 2026",
    },
    {
        id: 2,
        title: "Place Your Heading Here",
        description:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here.",
        image: "/images/Episode2.png",
        audio: "/audio/episode-2.mp3",
        show: "Hugh jass Show",
        episode: 1,
        session: 1,
        postedOn: "November 20, 2026",
    },
    {
        id: 3,
        title: "Place Your Heading Here",
        description:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here.",
        image: "/images/Episode3.png",
        audio: "/audio/episode-3.mp3",
        show: "Hugh jass Show",
        episode: 1,
        session: 1,
        postedOn: "November 20, 2026",
    },
];