import {Button} from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {Textarea} from '~components/ui/textarea';
import {getCurrentUser} from '~lib/session';
import {ProductWeb} from '~types/products';

const ProductContact = async ({company, mainImage, name}: ProductWeb) => {
    const user = await getCurrentUser();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-mainBlue">{'Kontakt'}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Wyślij zapytanie ofertowe'}</DialogTitle>
                    <DialogDescription>
                        {`Skontaktuj się z firmą ${company?.name} odnośnie wybranego produktu.`}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <img
                            src={mainImage}
                            className="w-12 aspect-square object-contain"
                        />
                        <div className="text-xs">{name}</div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Label htmlFor="email" className="text-left">
                                {'Email'}
                            </Label>
                            <Input
                                id="email"
                                value={user?.email || ''}
                                className="col-span-3 h-6 text-xs"
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="username" className="text-left">
                                {'Liczba produktów'}
                            </Label>
                            <Input
                                id="username"
                                className="col-span-3 h-6 text-xs"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="message" className="text-left">
                            {'Wiadomość'}
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Wprowadź tutaj wszystkie informacje na temat produktu oraz swoją wiadomość."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">{'Save changes'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductContact;
