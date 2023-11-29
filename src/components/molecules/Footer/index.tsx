import Logo from '~components/atoms/Logo';

const Footer = () => {
    return (
        <footer className='w-full bg-slate-100'>
            <div className="mt-8 py-12 flex flex-col gap-8 text-left container px-4 md:px-8">
                <div>
                    <Logo />
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:flex md:justify-between text-sm gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">{'Informacje'}</div>
                        <div>{'O nas'}</div>
                        <div>{'Regulamin'}</div>
                        <div>{'Cennik'}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">{'Dla ofertodawców'}</div>
                        <div>{'Zostań zweryfikowanym'}</div>
                        <div>{'Spersonalizowany plan'}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">{'Pomoc'}</div>
                        <div>{'Centrum pomocy'}</div>
                        <div>{'Zgłoś nadużycie'}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">{'Inne'}</div>
                        <div>{'Zostań partnerem'}</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
