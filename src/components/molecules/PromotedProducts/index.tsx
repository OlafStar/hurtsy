import {getData} from '~types/products';

const PromotedProducts = async () => {
    const data = await getData();
    return (
        <div className="px-4 border-l border-l-black border-opacity-10 flex flex-col gap-6">
            <div className="text-xl font-bold">{'Promowane'}</div>
            {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col justify-center items-center">
                    <img className='w-[84px] h-[84px] object-cover' src={item.mainImage || ''} alt={item.name} />
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    );
};

export default PromotedProducts;
