import Link from 'next/link';

import {Button, ButtonProps} from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import {PropsWithClassName} from '~types/generalTypes';
import {ProductWeb} from '~types/products';
import {cn} from '~utils/shadcn';
import {getCurrentUser} from '~lib/session';

import OfferForm from './OfferForm';

const ProductContact = async (
    props: ProductWeb &
        PropsWithClassName & {button?: ButtonProps; disableDialog?: boolean},
) => {
    const {company, className, button, disableDialog} = props;
    const user = await getCurrentUser();

    if (disableDialog) {
        return (
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">
                        {'Wyślij zapytanie ofertowe'}
                    </div>
                    <div>
                        {`Skontaktuj się z firmą ${company?.name} odnośnie wybranego produktu.`}
                    </div>
                </div>
                <OfferForm
                    formId="offerForm"
                    formName="offerForm"
                    {...props}
                    email={user?.email}
                />
                <div>
                    {user ? (
                        <Button type="submit" form="offerForm" disabled={!user}>
                            {'Wyślij'}
                        </Button>
                    ) : (
                        <Link href={'/login'}>
                            <Button type="button">{'Zaloguj'}</Button>
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`${cn(className)}`} {...button}>
                    {'Kontakt'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Wyślij zapytanie ofertowe'}</DialogTitle>
                    <DialogDescription>
                        {`Skontaktuj się z firmą ${company?.name} odnośnie wybranego produktu.`}
                    </DialogDescription>
                </DialogHeader>
                <OfferForm
                    formId="dialogOfferForm"
                    formName="dialogOfferForm"
                    {...props}
                    email={user?.email}
                />
                <DialogFooter>
                    {user ? (
                        <Button
                            type="submit"
                            form="dialogOfferForm"
                            disabled={!user}
                        >
                            {'Wyślij'}
                        </Button>
                    ) : (
                        <div className="flex flex-1 justify-between items-end">
                            <div className="text-xs opacity-50">
                                {'Kontakt z tą firmą dostępny jest po zalogowaniu'}
                            </div>
                            <Link href={'/login'}>
                                <Button type="button">{'Zaloguj'}</Button>
                            </Link>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductContact;
