
export interface Product {
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    createdAt: string;
    description: string;
    id: string;
    imageCover: string;
    images: string[];
    price: number;
    quantity: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    slug: string;
    sold: number;
    subcategory: Array<any>; // You can replace `any` with an actual type if known
    title: string;
    updatedAt: string;
    _id: string;
  }
  