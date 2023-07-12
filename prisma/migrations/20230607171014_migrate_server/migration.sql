/*
  Warnings:

  - You are about to drop the column `destination` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Exit` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Exit` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Exit` table. All the data in the column will be lost.
  - You are about to drop the column `materialType` on the `MaterialItem` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `Exit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Exit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Exit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialTypeId` to the `MaterialItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "destination",
DROP COLUMN "supplier",
ADD COLUMN     "destinationId" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Exit" DROP COLUMN "destination",
DROP COLUMN "product",
DROP COLUMN "supplier",
ADD COLUMN     "destinationId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MaterialItem" DROP COLUMN "materialType",
ADD COLUMN     "materialTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialItem" ADD CONSTRAINT "MaterialItem_materialTypeId_fkey" FOREIGN KEY ("materialTypeId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
