import {ChevronRight} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import ProductPageInfo from '~components/molecules/ProductPageInfo';
import PromotedProducts from '~components/molecules/PromotedProducts';
import {Button} from '~components/ui/button';
import {AppRoutes} from '~types/AppRoutes';
import {ProductWeb} from '~types/products';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

const ProductPage = (props: ProductWeb) => {
    const {category, description, customProperties, company} = props;

    return (
        <div className="flex justify-between pt-8">
            <div className="w-full flex flex-col flex-1 gap-8 ">
                <div className="overflow-x-scroll scroll hide-scrollbar">
                    <div className="flex gap-1 flex-shrink-0">
                        <div className="text-xs whitespace-nowrap">
                            {translateEnumValueToPolish(
                                category?.mainCategory as string,
                            )}
                        </div>
                        {category?.subCategory.length && (
                            <ChevronRight className="h-[16px]" />
                        )}
                        <div className="flex gap-4 whitespace-nowrap">
                            {category?.subCategory.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="text-xs">
                                        {translateEnumValueToPolish(item)}
                                    </div>
                                    {!(
                                        category?.subCategory.length <=
                                        index + 1
                                    ) && (
                                        <div className="w-[1px] h-[16px] bg-black" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-8 lg:flex-row flex-col">
                    <div className="flex-1">
                        <ProductPageInfo {...props} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-2xl font-bold">{'Kluczowe atrybuty'}</div>
                    <div className="pt-4">
                        {customProperties?.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div
                                        className={`grid grid-cols-2 gap-x-8 py-4 ${
                                            index % 2 === 1 &&
                                            `bg-[#b4b4b4] bg-opacity-5`
                                        }`}
                                    >
                                        <div className="font-medium justify-self-end text-end">
                                            {item.name}
                                        </div>
                                        <div>{item.value}</div>
                                    </div>
                                    <div className="w-full h-[1px] bg-black opacity-5 " />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl">
                    <div className="font-bold text-2xl">{'Poznaj sprzedawce'}</div>
                    <div className="grid xs:grid-cols-2 lg:grid-cols-[164px_1fr_1fr] gap-8 md:gap-4 xs:justify-items-center justify-items-normal">
                        <img
                            className="w-full max-w-[192px] lg:max-w-auto aspect-square object-contain"
                            src={company?.image || ''}
                        />
                        <div className="flex flex-col justify-center">
                            <div className="text-xl font-medium">
                                {company?.name}
                            </div>
                            <div className="flex gap-1">
                                <div>{'Adres: '}</div>
                                <div>{`${company?.street}, ${company?.postCode} ${company?.city}`}</div>
                            </div>
                            <div className="flex gap-1">
                                <div>{'Działa od: '}</div>
                                <div>{`${company?.establishment}`}</div>
                            </div>
                            <div className="flex gap-1">
                                <div>{'Typ: '}</div>
                                <div>{`${company?.type}`}</div>
                            </div>
                            <div className="flex gap-1">
                                <div>{'Główne produkty: '}</div>
                                <div>{`${company?.mainProducts}`}</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center gap-4 xs:col-span-2 lg:col-span-1">
                            <div className="text-xl font-bold">
                                {'Sprawdź więcej informacji'}
                            </div>
                            <Link href={`${AppRoutes.WEB_COMPANIES}/${company?.id}`}>
                                <Button>{'Zobacz profil'}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <PromotedProducts className="flex xl:hidden" />
                {description && (
                    <div className="flex flex-col gap-6">
                        <div className="font-bold text-2xl">{'Opis'}</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: description ? description : '',
                            }}
                        />
                    </div>
                )}
            </div>
            <PromotedProducts className="hidden xl:flex" />
        </div>
    );
};

export default ProductPage;
