const Page = ({params: {slug}}: {params: {slug: string[]}}) => {
    const completeSlug = `/${slug.join('/')}`;

    switch (completeSlug) {
        default:
            return <div>Invalid slug!</div>;
    }
};

export default Page;
