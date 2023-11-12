import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';
import ProductContact from '~components/atoms/ProductContact';

import ServerRepresentative from '../Representative/ServerRepresentative';

type ProductCompanyProps = {
    product: ProductWeb;
    representativeId: string;
};

const ProductCompany = async ({product, representativeId}: ProductCompanyProps) => {
    const representative = await serverClient.getRepresentative(representativeId);

    const {company} = product;
    return (
        <div className="flex flex-col gap-8">
            {company && (
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <img
                            src={company.image || ''}
                            className="w-[72px] h-[72px] object-contain"
                        />
                        <div className="flex flex-col gap-3">
                            <div className="text-sm">{company.name}</div>
                            <div className="flex gap-1 text-xs">
                                <div className="opacity-50">{'Adres:'}</div>
                                <div className="flex flex-col">
                                    <div>{`${company.street}`}</div>
                                    <div>{`${company.postCode} ${company.city}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductContact {...product} />
                </div>
            )}

            {representative && <ServerRepresentative {...representative} />}
        </div>
    );
};

export default ProductCompany;
