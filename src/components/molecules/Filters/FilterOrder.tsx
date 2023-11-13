'use client';

import {CompanyType} from '@prisma/client';
import {usePathname} from 'next/navigation';
import {useState} from 'react';

import ClearFilterButton from '~components/atoms/ClearFilterButton';
import {Button} from '~components/ui/button';
import {Checkbox} from '~components/ui/checkbox';
import {Input} from '~components/ui/input';
import {SearchParams, SearchParamsType} from '~config/searchParams';
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {AppRoutes} from '~types/AppRoutes';

type FilterOrderProps = {
    params?: SearchParamsType;
};

const FilterOrder = ({params}: FilterOrderProps) => {
    const path = usePathname();

    const {updateParams} = useAddSearchParams();

    const [minQuantity, setMinQuantity] = useState(params?.minQuantity || '');
    const [price, setPrice] = useState(params?.price || '');
    const [deliveryPrice, setDeliveryPrice] = useState(params?.deliveryPrice || '');
    const [companyType, setCompanyType] = useState<Array<CompanyType>>(
        params?.companyType ? (params?.companyType as Array<CompanyType>) : [],
    );
    const [isPromoted, setIsPromoted] = useState(params?.isPromoted || '');

    const handleMinQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || /^[0-9]+$/.test(e.target.value)) {
            setMinQuantity(e.target.value);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || /^[0-9]+$/.test(e.target.value)) {
            setPrice(e.target.value);
        }
    };

    const handleDeliveryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || /^[0-9]+$/.test(e.target.value)) {
            setDeliveryPrice(e.target.value);
        }
    };

    const handleCompanyTypeChange = (value: CompanyType) => {
        setCompanyType((prev) =>
            prev.includes(value)
                ? prev.filter((type) => type !== value)
                : [...prev, value],
        );
    };

    return (
        <>
            {path !== AppRoutes.WEB_COMPANIES && (
                <>
                    <div className="text-sm font-bold">{'Zamówienie'}</div>

                    <div className="flex-col flex gap-2">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <div>{'Min'}</div>
                                <ClearFilterButton
                                    paramsToDelete={[SearchParams.MinQuantity]}
                                    className="text-xs leading-none"
                                >
                                    {'Wyczyść'}
                                </ClearFilterButton>
                            </div>
                            <Input
                                className="text-xs h-6"
                                value={minQuantity}
                                onChange={handleMinQuantityChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <div>{'Cena'}</div>
                                <ClearFilterButton
                                    paramsToDelete={[SearchParams.Price]}
                                    className="text-xs leading-none"
                                >
                                    {'Wyczyść'}
                                </ClearFilterButton>
                            </div>
                            <Input
                                className="text-xs h-6"
                                value={price}
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <div>{'Cena dostawy'}</div>
                                <ClearFilterButton
                                    paramsToDelete={[SearchParams.DeliveryPrice]}
                                    className="text-xs leading-none"
                                >
                                    {'Wyczyść'}
                                </ClearFilterButton>
                            </div>
                            <Input
                                className="text-xs h-6"
                                value={deliveryPrice}
                                onChange={handleDeliveryPriceChange}
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="text-sm font-bold">{'Sprzedawca'}</div>
            <div className="flex-col flex gap-2">
                {Object.entries(CompanyType).map(([_, value], index) => (
                    <div className="flex gap-2 items-center text-sm" key={index}>
                        <Checkbox
                            checked={companyType.includes(value)}
                            onClick={() => handleCompanyTypeChange(value)}
                        />
                        <div>{value}</div>
                    </div>
                ))}
            </div>
            <div className="text-sm font-bold">{'Dodatkowe'}</div>
            <div className="flex-col flex gap-2">
                {path !== AppRoutes.WEB_COMPANIES && (
                    <div className="flex gap-2 items-center text-sm">
                        <Checkbox
                            checked={isPromoted === 'true'}
                            onClick={() =>
                                setIsPromoted(
                                    isPromoted === 'true' ? 'false' : 'true',
                                )
                            }
                        />
                        <div>{'Promowane'}</div>
                    </div>
                )}
            </div>
            <Button
                onClick={() => {
                    const updatedParams = {
                        ...(price !== '' && {price}),
                        ...(minQuantity !== '' && {minQuantity}),
                        ...(deliveryPrice !== '' && {deliveryPrice}),
                        ...(companyType.length > 0 && {companyType}),
                        ...(isPromoted !== '' && {isPromoted}),
                    };

                    const resetKeys = [
                        ...(price === '' ? [SearchParams.Price] : []),
                        ...(minQuantity === '' ? [SearchParams.MinQuantity] : []),
                        ...(deliveryPrice === ''
                            ? [SearchParams.DeliveryPrice]
                            : []),
                        ...(companyType.length === 0
                            ? [SearchParams.CompanyType]
                            : []),
                        ...(isPromoted === '' ? [SearchParams.IsPromoted] : []),
                    ];
                    updateParams(updatedParams, resetKeys);
                }}
            >
                {'Filtruj'}
            </Button>
        </>
    );
};

export default FilterOrder;
