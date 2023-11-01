import {trpc} from '~app/_trpc/client';
import {Button} from '~components/ui/button';
import {useToast} from '~components/ui/use-toast';
import useUserCompanyRepresentatives from '~hooks/useUserCompanyRepresentatives';

const DeleteRepresentative = ({id}: {id: string}) => {
    const {mutateAsync} = trpc.deleteRepresentative.useMutation();
    const {toast} = useToast();
    const {refetch} = useUserCompanyRepresentatives();

    const handleDeleteRepresentative = async () => {
        await mutateAsync({id});
        refetch();
        toast({title: 'Success', description: 'Representative has beed deleted'});
    };

    return (
        <>
            <div>{'Czy na pewno chcesz usunąć przedstawicela?'}</div>
            <Button onClick={handleDeleteRepresentative}>{'Usuń'}</Button>
        </>
    );
};

export default DeleteRepresentative;
