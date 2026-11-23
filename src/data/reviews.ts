export type Review = {
    id: number;
    name: string;
    text: string;
    image: string;
    rating: number;
};

export const REVIEWS: Review[] = [
    {
        id: 1,
        name: "Author Name",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London,",
        image: "/images/Author1.png",
        rating: 5,
    },
    {
        id: 2,
        name: "Author Name",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London,",
        image: "/images/Author2.png",
        rating: 5,
    },
    {
        id: 3,
        name: "Author Name",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London,",
        image: "/images/Author3.png",
        rating: 5,
    },
];