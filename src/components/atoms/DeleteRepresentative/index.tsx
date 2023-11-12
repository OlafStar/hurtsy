import {trpc} from '~app/_trpc/client';
import {Button} from '~components/ui/button';
import {useToast} from '~components/ui/use-toast';
import {useUserCompany} from '~hooks/useUserCompany';
import useUserCompanyRepresentatives from '~hooks/useUserCompanyRepresentatives';

const DeleteRepresentative = ({id, name}: {id: string; name: string}) => {
    const {mutateAsync} = trpc.deleteRepresentative.useMutation();
    const {toast} = useToast();
    const {refetch} = useUserCompanyRepresentatives();
    const {company} = useUserCompany();
    const handleDeleteRepresentative = async () => {
        await mutateAsync({id});
        refetch();
        toast({title: 'Success', description: 'Representative has beed deleted'});
    };

    return !(name === company?.name) ? (
        <>
            <div>{'Czy na pewno chcesz usunąć przedstawicela?'}</div>
            <Button onClick={handleDeleteRepresentative}>{'Usuń'}</Button>
        </>
    ) : (
        <div>
            <div>{'Nie mozna usunąć firmy z przedstawicieli'}</div>
        </div>
    );
};

export default DeleteRepresentative;
