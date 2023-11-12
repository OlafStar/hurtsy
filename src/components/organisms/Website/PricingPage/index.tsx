import {Check} from 'lucide-react';

import SubscribeButton from '~components/atoms/SubscribeButton';
import {SearchParamsType} from '~config/searchParams';
import {PLANS} from '~config/stripe';

type PricingPageProps = {
    searchParams?: SearchParamsType;
};

const PricingPage = ({}: PricingPageProps) => {
    return (
        <div className="flex flex-col items-center pt-8 gap-4">
            <div className="text-3xl font-bold">{'Plany'}</div>
            <div className="text-sm opacity-60">
                {
                    'Wybierz plan, który napędzi Twój biznes – prostota, elastyczność, wyniki.'
                }
            </div>
            <div className="container mx-auto px-6 py-12 relative">
                <div className="grid grid-cols-5">
                    <div></div>
                    {PLANS.map((item, index) => (
                        <div key={index} className="flex flex-col gap-8 px-4">
                            <div className="flex flex-col gap-1 text-sm">
                                <div>{item.name}</div>
                                <div className="flex gap-1 items-end">
                                    <div className="text-3xl font-bold">
                                        {item.price.amount}
                                    </div>
                                    <div>{'/miesiąc'}</div>
                                </div>
                            </div>
                            {!(item.name === 'Free') && (
                                <SubscribeButton name={item.name} plan={item.name} />
                            )}
                        </div>
                    ))}
                    <div className="col-span-5 border-b border-black border-opacity-10 py-4 pt-12 font-medium">
                        {'Właściwości'}
                    </div>
                    <div className="col-span-5 text-sm">
                        <table className="table-fixed w-full">
                            <tbody>
                                <tr className="border-b border-black border-opacity-5 py-4">
                                    <td className="py-4">{'Produkty'}</td>
                                    {PLANS.map((plan, index) => (
                                        <td key={index} className="py-4 text-center">
                                            {plan.availableProducts}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-black border-opacity-5">
                                    <td className="py-4">{'Promowanie produktu'}</td>
                                    {PLANS.map((plan, index) => (
                                        <td key={index} className="py-4 text-center">
                                            {plan.availablePromotions}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-black border-opacity-5">
                                    <td className="py-4">{'Podbijanie produktu'}</td>
                                    {PLANS.map((plan, index) => (
                                        <td key={index} className="py-4 text-center">
                                            {plan.availableBumps}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-black border-opacity-5">
                                    <td className="py-4">{'Przedstawiciele'}</td>
                                    {PLANS.map((plan, index) => (
                                        <td key={index} className="py-4 text-center">
                                            {plan.availableRepresentatives}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-5 border-b border-black border-opacity-10 py-4 pt-12 font-medium">
                    {'Wsparcie'}
                </div>
                <div className="col-span-5 text-sm">
                    <table className="table-fixed w-full">
                        <tbody>
                            <tr className="border-b border-black border-opacity-5 py-4">
                                <td className="py-4">{'Pełne wsparcie'}</td>
                                {PLANS.map((plan, index) => (
                                    <td key={index} className="py-4 text-center">
                                        {plan.support.fullSupport ? (
                                            <Check className="mx-auto" />
                                        ) : (
                                            <div className="w-2 h-[2px] bg-black opacity-30 mx-auto" />
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-black border-opacity-5">
                                <td className="py-4">{'Pomoc indywidualna'}</td>
                                {PLANS.map((plan, index) => (
                                    <td key={index} className="py-4 text-center">
                                        {plan.support.oneOnOneSupport ? (
                                            <Check className="mx-auto" />
                                        ) : (
                                            <div className="w-2 h-[2px] bg-black opacity-30 mx-auto" />
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-black border-opacity-5">
                                <td className="py-4">
                                    {'Pomoc przy tworzeniu produktów'}
                                </td>
                                {PLANS.map((plan, index) => (
                                    <td key={index} className="py-4 text-center">
                                        {plan.support.productCreationSupport ? (
                                            <Check className="mx-auto" />
                                        ) : (
                                            <div className="w-2 h-[2px] bg-black opacity-30 mx-auto" />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="absolute left-0 right-0 h-full top-0 mx-6 pointer-events-none">
                    <div className="relative h-full">
                        <div className="absolute bg-black bg-opacity-[2%] top-0 bottom-0 left-[60%] w-[20%] border-black border-opacity-5  rounded-3xl border-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
