import ProductContact from '~components/atoms/ProductContact';
import {serverClient} from '~server/trpc/serverClient';
import {PropsWithClassName, PropsWithParams} from '~types/generalTypes';
import {ProductWeb} from '~types/products';
import {cn} from '~utils/shadcn';

const PromotedProducts = async ({
    searchParams,
    className,
}: PropsWithParams & PropsWithClassName) => {
    const {promotedProducts} = await serverClient.getPromotedProducts({
        category: searchParams?.category as string,
        subCategory: searchParams?.subCategory as string,
    });

    if (promotedProducts.length <= 0) {
        return null;
    }

    return (
        <div className="relative">
            <div
                className={`sticky top-4 xl:max-w-[220px] xl:px-4 flex flex-col gap-3 xl:gap-6 ${cn(
                    className,
                )}`}
            >
                <div className="text-xl font-bold">{'Promowane'}</div>
                <div className="overflow-y-scroll xs:overflow-auto hide-scrollbar flex xl:flex-col gap-6">
                    {promotedProducts.map((item, index) => (
                        <div
                            key={index}
                            className="w-[192px] flex-shrink-0 xs:flex-shrink-1 xs:w-auto xs:flex-1 flex flex-col gap-2 justify-between xl:justify-center items-center"
                        >
                            <img
                                className="w-[84px] h-[84px] object-contain"
                                src={item.mainImage || ''}
                                alt={item.name}
                            />
                            <div className="text-xs line-clamp-2">{item.name}</div>
                            <ProductContact
                                {...(item as ProductWeb)}
                                className="w-full"
                                button={{variant: 'secondary'}}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotedProducts;
