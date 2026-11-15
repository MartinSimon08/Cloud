import type { ObjectId } from "mongodb";

export interface UserDoc {
  _id: ObjectId;
  cognitoSub: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantDoc {
  _id: ObjectId;
  ownerId: string;
  name: string;
  description: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

export interface MenuDoc {
  _id: ObjectId;
  restaurantId: ObjectId;
  ownerId: string;
  name: string;
  description: string;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}
