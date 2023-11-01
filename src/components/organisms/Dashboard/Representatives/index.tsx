import RepresentativeForm from '~components/molecules/RepresentativeForm';
import RepresentativesList from '~components/molecules/RepresentativesList';
import {serverClient} from '~server/trpc/serverClient';

const Representatives = async () => {
    const representatives = await serverClient.getUserCompanyRepresentatives();
    return (
        <div className="h-full p-4 grid grid-cols-fit-1fr gap-4">
            <RepresentativesList initialRepresentatives={representatives} />
            <div>
                <RepresentativeForm />
            </div>
        </div>
    );
};

export default Representatives;
