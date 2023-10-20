import RepresentativesList from '~components/molecules/RepresentativesList';

const Representatives = () => {
    return (
        <div className="h-full p-4 grid grid-cols-fit-1fr gap-4">
            <RepresentativesList />
            <div></div>
        </div>
    );
};

export default Representatives;
