export type IAuth = {
  username: string;
  password: string;
};

export type IProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryIds: number[];
  ageRangeId: number;
};
