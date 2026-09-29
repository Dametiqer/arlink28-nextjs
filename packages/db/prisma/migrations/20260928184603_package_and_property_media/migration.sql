-- package_images becomes package_media (photos + embedded videos) and lodges get
-- their own reusable gallery (ADR 0003). package_images was never written to:
-- the seed inserts no images and the upload endpoints (M4) don't exist yet, so
-- dropping it loses nothing in any environment.
SET default_storage_engine = InnoDB;

-- DropForeignKey
ALTER TABLE `package_images` DROP FOREIGN KEY `package_images_package_id_fkey`;

-- DropTable
DROP TABLE `package_images`;

-- CreateTable
CREATE TABLE `package_media` (
    `id` CHAR(36) NOT NULL,
    `package_id` CHAR(36) NOT NULL,
    `role` ENUM('HERO', 'GALLERY', 'POSTER') NOT NULL DEFAULT 'GALLERY',
    `path` VARCHAR(255) NOT NULL,
    `alt` VARCHAR(200) NOT NULL,
    `caption` VARCHAR(300) NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `video_provider` ENUM('YOUTUBE', 'VIMEO') NULL,
    `video_id` VARCHAR(40) NULL,
    `variants_ready` BOOLEAN NOT NULL DEFAULT false,
    `sort_key` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `package_media_path_key`(`path`),
    INDEX `package_media_package_id_role_sort_key_idx`(`package_id`, `role`, `sort_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_media` (
    `id` CHAR(36) NOT NULL,
    `property_id` CHAR(36) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `alt` VARCHAR(200) NOT NULL,
    `caption` VARCHAR(300) NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `video_provider` ENUM('YOUTUBE', 'VIMEO') NULL,
    `video_id` VARCHAR(40) NULL,
    `variants_ready` BOOLEAN NOT NULL DEFAULT false,
    `sort_key` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `property_media_path_key`(`path`),
    INDEX `property_media_property_id_sort_key_idx`(`property_id`, `sort_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `package_media` ADD CONSTRAINT `package_media_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_media` ADD CONSTRAINT `property_media_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Hand-written CHECKs (Prisma can't express these). A row is a photo when both
-- video columns are NULL, a video (with a photo thumbnail) when both are set.
ALTER TABLE `package_media`
  ADD CONSTRAINT `package_media_size_chk`       CHECK (`width` > 0 AND `height` > 0),
  ADD CONSTRAINT `package_media_video_chk`      CHECK ((`video_provider` IS NULL) = (`video_id` IS NULL)),
  ADD CONSTRAINT `package_media_video_role_chk` CHECK (`video_provider` IS NULL OR `role` = 'GALLERY');

ALTER TABLE `property_media`
  ADD CONSTRAINT `property_media_size_chk`  CHECK (`width` > 0 AND `height` > 0),
  ADD CONSTRAINT `property_media_video_chk` CHECK ((`video_provider` IS NULL) = (`video_id` IS NULL));
