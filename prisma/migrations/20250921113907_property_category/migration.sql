/*
  Warnings:

  - You are about to drop the column `slug` on the `amenity` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `property_category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Amenity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Property_Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Amenity_slug_key` ON `amenity`;

-- DropIndex
DROP INDEX `Property_Category_slug_key` ON `property_category`;

-- AlterTable
ALTER TABLE `amenity` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `property_category` DROP COLUMN `slug`;

-- CreateIndex
CREATE UNIQUE INDEX `Amenity_name_key` ON `Amenity`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Property_Category_name_key` ON `Property_Category`(`name`);
