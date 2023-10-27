export const productFormDefaultValues = {
  name: '',
  description: '',
  mainImage: '',
  images: [],
  category: {
      mainCategory: '',
      subCategory: [],
  },
  prices: [
      {
          price: 0,
          minQuantity: 0,
          maxQuantity: 0,
      },
  ],
  deliveryPrice: 0,
  customizations: [
      {
          name: '',
          minQuantity: 0,
      },
  ],
  customProperties: [
      {
          name: '',
          value: '',
      },
  ],
};