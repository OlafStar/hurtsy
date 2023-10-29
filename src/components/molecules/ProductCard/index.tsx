import {ProductWeb} from '~types/products';

const ProductCard = ({name, mainImage, prices, customProperties}: ProductWeb) => {
    console.log(prices);
    const allPrices = prices.map((p) => p.price);
    const allMinQuantities = prices.map((p) => p.minQuantity);

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const lowestMinQuantity = Math.min(...allMinQuantities);

    const priceRange = `${minPrice} - ${maxPrice} zł`;
    return (
        <div className="flex gap-3 leading-none">
            <img src={mainImage} className="w-[161px] h-[161px] object-cover" />
            <div className="w-full flex flex-col gap-3">
                <div>{name}</div>
                <div className="flex flex-col">
                    <div className="text-xl font-bold">{priceRange}</div>
                    <div className="text-xs opacity-50">{`Min: ${lowestMinQuantity}`}</div>
                </div>
                <div className="grid auto-cols-min grid-rows-3">
                    {customProperties.map((item, index) => (
                        <div key={index} className="flex text-xs gap-1">
                            <div className="opacity-50">{`${item.name}:`}</div>
                            <div>{item.value}</div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className='text-xs opacity-50'>
                  {"Sample company sp. z.o.o"}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
