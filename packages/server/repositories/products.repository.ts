import { PrismaClient, type Product } from '../generated/prisma';

export class ProductsRepository {
   private readonly prisma: PrismaClient;

   constructor(prisma?: PrismaClient) {
      this.prisma = prisma ?? new PrismaClient();
   }

   async getProduct(id: number): Promise<Product | null> {
      return await this.prisma.product.findUnique({
         where: { id },
      });
   }
}

export const productsRepository = new ProductsRepository();
