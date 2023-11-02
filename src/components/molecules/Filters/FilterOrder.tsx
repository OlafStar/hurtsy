'use client';

import {CompanyType} from '@prisma/client';
import {useState} from 'react';
import {Button} from '~components/ui/button';
import {Checkbox} from '~components/ui/checkbox';
import {Input} from '~components/ui/input';
import {SearchParams, SearchParamsType} from '~config/searchParams';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

type FilterOrderProps = {
    params?: SearchParamsType;
};

const FilterOrder = ({params}: FilterOrderProps) => {
    const {updateParams} = useAddSearchParams();

    const [minQuantity, setMinQuantity] = useState(params?.minQuantity || '');
    const [price, setPrice] = useState(params?.price || '');
    const [deliveryPrice, setDeliveryPrice] = useState(params?.deliveryPrice || '');
    const [companyType, setCompanyType] = useState<Array<CompanyType>>(
        params?.companyType ? (params?.companyType as Array<CompanyType>) : [],
    );

    const handleMinQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinQuantity(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleDeliveryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryPrice(e.target.value);
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
            <div className="text-sm font-bold">{'Zamówienie'}</div>
            <div className="flex-col flex gap-2">
                <div className="flex flex-col gap-1">
                    <div className="text-xs">{'Min'}</div>
                    <Input
                        className="text-xs h-6"
                        value={minQuantity}
                        onChange={handleMinQuantityChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xs">{'Cena'}</div>
                    <Input
                        className="text-xs h-6"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xs">{'Cena dostawy'}</div>
                    <Input
                        className="text-xs h-6"
                        value={deliveryPrice}
                        onChange={handleDeliveryPriceChange}
                    />
                </div>
            </div>
            <div className="text-sm font-bold">{'Sprzedawca'}</div>
            <div className="flex-col flex gap-2">
                {Object.entries(CompanyType).map(([key, value], index) => (
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
            <div className="flex-col flex gap-2"></div>
            <Button
                onClick={() => {
                    const updatedParams = {
                        ...(price !== '' && {price}),
                        ...(minQuantity !== '' && {minQuantity}),
                        ...(deliveryPrice !== '' && {deliveryPrice}),
                        ...(companyType.length > 0 && {companyType}),
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
