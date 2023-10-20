import RepresentativesList from '~components/molecules/RepresentativesList';

const Representatives = () => {
    return (
        <div className="p-4 grid grid-cols-2 gap-4">
            <RepresentativesList />
            <div></div>
        </div>
    );
};

export default Representatives;
