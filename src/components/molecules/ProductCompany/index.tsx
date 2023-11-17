import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';
import ProductContact from '~components/atoms/ProductContact';

import ServerRepresentative from '../Representative/ServerRepresentative';

type ProductCompanyProps = {
    product: ProductWeb;
};

const ProductCompany = async ({product}: ProductCompanyProps) => {
    const representative = await serverClient.getRepresentative(
        product.representativeId,
    );

    const {company} = product;
    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            {company && (
                <div className="flex flex-col gap-3 justify-between border border-black border-opacity-10 rounded-xl overflow-hidden">
                    <div className="flex gap-2 items-center">
                        <img
                            src={company.image || ''}
                            className="w-[72px] h-[72px] object-contain"
                        />
                        <div className="flex flex-1 flex-col gap-2">
                            <div>{company.name}</div>
                            <div className="flex gap-1 text-xs">
                                <div className="opacity-50">{'Adres:'}</div>
                                <div className="flex flex-row flex-wrap">
                                    <div>{`${company.street}`}</div>
                                    <div>{`${company.postCode} ${company.city}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductContact
                        {...product}
                        className="text-sm border-t-black border-opacity-10 rounded-t-none"
                    />
                </div>
            )}
            <div className="border border-black border-opacity-10 rounded-xl">
                {representative && <ServerRepresentative {...representative} />}
            </div>
        </div>
    );
};

export default ProductCompany;
