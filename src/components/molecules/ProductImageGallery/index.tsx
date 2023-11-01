'use client';

import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useState} from 'react';

type ProductImageGalleryProps = {
    images: string[];
};

const ProductImageGallery = ({images}: ProductImageGalleryProps) => {
    const [currentDisplayedImage, setCurrentDisplayedImage] = useState(0);

    const handleImageClick = (clickedImage: number) => {
        setCurrentDisplayedImage(clickedImage);
    };

    const handlePrevious = () => {
        const previous =
            currentDisplayedImage <= 0
                ? images.length - 1
                : currentDisplayedImage - 1;
        setCurrentDisplayedImage(previous);
    };

    const handleNext = () => {
        const next =
            currentDisplayedImage >= images.length - 1
                ? 0
                : currentDisplayedImage + 1;
        setCurrentDisplayedImage(next);
    };

    return (
        <div className="w-[282px]">
            <div className="w-[282px] h-[282px]">
                <img
                    src={images[currentDisplayedImage]}
                    alt="Main product"
                    className="w-full h-full object-contain object-center"
                />
            </div>
            <div className="flex space-x-2 justify-center items-center">
                <ChevronLeft
                    className="w-[16px] cursor-pointer"
                    onClick={handlePrevious}
                />
                <div className="flex gap-1 flex-1 justify-center overflow-hidden">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-[32px] h-[32px] cursor-pointer"
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-[32px] h-[32px] cursor-pointer"
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
                <ChevronRight
                    className="w-[16px] cursor-pointer"
                    onClick={handleNext}
                />
            </div>
        </div>
    );
};

export default ProductImageGallery;
