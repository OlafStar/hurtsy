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
    return (
        <div className="relative">
            <div
                className={`sticky top-4 xl:max-w-[220px] xl:px-4 flex flex-col gap-3 xl:gap-6 ${cn(
                    className,
                )}`}
            >
                <div className="text-xl font-bold">{'Promowane'}</div>
                <div className="flex xl:flex-col gap-6">
                    {promotedProducts.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 flex flex-col gap-2 justify-between xl:justify-center items-center"
                        >
                            <img
                                className="w-[84px] h-[84px] object-contain"
                                src={item.mainImage || ''}
                                alt={item.name}
                            />
                            <div className="text-xs">{item.name}</div>
                            <ProductContact
                                {...(item as ProductWeb)}
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotedProducts;
