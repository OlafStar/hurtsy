import {serverClient} from '~server/trpc/serverClient';
import ServerRepresentative from '../Representative/ServerRepresentative';
import {CompanyTypeWeb} from '~types/company';

type ProductCompanyProps = {
    company: CompanyTypeWeb;
    representativeId: string;
};

const ProductCompany = async ({company, representativeId}: ProductCompanyProps) => {
    const representative = await serverClient.getRepresentative(representativeId);
    return (
        <div className="flex flex-col gap-8">
            {company && (
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        {/* <img src={company.image}/> */}
                        <img
                            src={company.image || ''}
                            className="w-[72px] h-[72px] bg-cyan-200 object-contain"
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
                </div>
            )}
            {representative && <ServerRepresentative {...representative} />}
        </div>
    );
};

export default ProductCompany;
