-- AlterTable
ALTER TABLE `seasons` ADD COLUMN `slug` VARCHAR(80) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `seasons_slug_key` ON `seasons`(`slug`);

