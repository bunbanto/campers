export interface CampImages {
  thumb: string;
  full: string;
}

export interface CampReviews {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}
export interface Camper {
  id: number;
  name: string;
  location?: string;
  price: number;
  rating: number;
  gallery?: CampImages[];
  transmission?: string;
  description: string;
  engine?: string;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  form?: string;
  length?: number;
  width?: number;
  height?: number;
  tank?: number;
  consumption?: number;
  reviews?: CampReviews[];
}
