import type { Brand, Category, Order, Product, User } from '../types';
import { sampleBrands, sampleCategories, sampleOrders, sampleProducts, sampleUsers } from '../data/mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  await wait(400);
  return sampleProducts;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await wait(300);
  return sampleProducts.find((item) => item.id === id) ?? null;
}

export async function fetchCategories(): Promise<Category[]> {
  await wait(200);
  return sampleCategories;
}

export async function fetchBrands(): Promise<Brand[]> {
  await wait(200);
  return sampleBrands;
}

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  await wait(300);
  const user = sampleUsers.find((item) => item.id === userId);
  return user?.orders ?? sampleOrders;
}

export async function fetchUserByEmail(email: string): Promise<User | null> {
  await wait(300);
  return sampleUsers.find((user) => user.email === email) ?? null;
}
