import type { Product } from '../generated/prisma';
import {
   ProductsRepository,
   productsRepository,
} from '../repositories/products.repository';

export class ProductService {
   constructor(private readonly productsRepository: ProductsRepository) {}

   async getProduct(id: number): Promise<Product | null> {
      return await productsRepository.getProduct(id);
   }
}

export const productService = new ProductService(productsRepository);
