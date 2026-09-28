-- Pin InnoDB for this session: some local servers (e.g. WAMP) default to
-- MyISAM, which silently ignores foreign keys, transactions and row locks.
SET default_storage_engine = InnoDB;

-- CreateTable
CREATE TABLE `destinations` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `country` CHAR(2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `destinations_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partners` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `tagline` VARCHAR(200) NULL,
    `logo_path` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `partners_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `partner_id` CHAR(36) NOT NULL,
    `destination_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `properties_slug_key`(`slug`),
    INDEX `properties_partner_id_idx`(`partner_id`),
    INDEX `properties_destination_id_idx`(`destination_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(120) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `title` VARCHAR(160) NOT NULL,
    `subtitle` VARCHAR(200) NULL,
    `summary` VARCHAR(500) NOT NULL,
    `description` TEXT NULL,
    `category` VARCHAR(40) NOT NULL,
    `destination_id` CHAR(36) NOT NULL,
    `nights` SMALLINT NOT NULL,
    `min_nights` SMALLINT NOT NULL,
    `adults` TINYINT NOT NULL,
    `children` TINYINT NOT NULL DEFAULT 0,
    `pricing_basis` ENUM('PER_PARTY', 'PER_PERSON') NOT NULL DEFAULT 'PER_PARTY',
    `base_currency` CHAR(3) NOT NULL DEFAULT 'USD',
    `from_price_minor` BIGINT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `seo_title` VARCHAR(160) NULL,
    `seo_description` VARCHAR(300) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `published_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `packages_slug_key`(`slug`),
    INDEX `packages_status_category_idx`(`status`, `category`),
    INDEX `packages_status_destination_id_idx`(`status`, `destination_id`),
    INDEX `packages_status_featured_sort_order_idx`(`status`, `featured`, `sort_order`),
    INDEX `packages_destination_id_idx`(`destination_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_stays` (
    `id` CHAR(36) NOT NULL,
    `package_id` CHAR(36) NOT NULL,
    `property_id` CHAR(36) NOT NULL,
    `nights` SMALLINT NOT NULL,
    `room_type` VARCHAR(120) NULL,
    `sort_order` SMALLINT NOT NULL,

    INDEX `package_stays_package_id_sort_order_idx`(`package_id`, `sort_order`),
    INDEX `package_stays_property_id_idx`(`property_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `features` (
    `id` CHAR(36) NOT NULL,
    `key` VARCHAR(80) NOT NULL,
    `label` VARCHAR(160) NOT NULL,
    `icon` VARCHAR(60) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `features_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_features` (
    `id` CHAR(36) NOT NULL,
    `package_id` CHAR(36) NOT NULL,
    `section` ENUM('INCLUDED', 'PREMIUM_SERVICE', 'HIGHLIGHT', 'VEHICLE', 'PERK', 'EXCLUDED', 'NOTE') NOT NULL,
    `feature_id` CHAR(36) NULL,
    `label_override` VARCHAR(300) NULL,
    `footnote` VARCHAR(300) NULL,
    `sort_order` SMALLINT NOT NULL,

    INDEX `package_features_package_id_section_sort_order_idx`(`package_id`, `section`, `sort_order`),
    INDEX `package_features_feature_id_idx`(`feature_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seasons` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `partner_id` CHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `seasons_partner_id_idx`(`partner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `season_ranges` (
    `id` CHAR(36) NOT NULL,
    `season_id` CHAR(36) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,

    INDEX `season_ranges_season_id_start_date_idx`(`season_id`, `start_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_rates` (
    `id` CHAR(36) NOT NULL,
    `package_id` CHAR(36) NOT NULL,
    `season_id` CHAR(36) NOT NULL,
    `currency` CHAR(3) NOT NULL,
    `price_minor` BIGINT NOT NULL,
    `extra_night_price_minor` BIGINT NULL,

    INDEX `package_rates_season_id_idx`(`season_id`),
    UNIQUE INDEX `package_rates_package_id_season_id_currency_key`(`package_id`, `season_id`, `currency`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_add_ons` (
    `id` CHAR(36) NOT NULL,
    `package_id` CHAR(36) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `description` VARCHAR(500) NULL,
    `unit` ENUM('PER_STAY', 'PER_NIGHT', 'PER_DAY', 'PER_PERSON') NOT NULL,
    `currency` CHAR(3) NOT NULL,
    `price_minor` BIGINT NOT NULL,
    `sort_order` SMALLINT NOT NULL,

    INDEX `package_add_ons_package_id_sort_order_idx`(`package_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_images` (
    `id` CHAR(36) NOT NULL,
    `package_id` CHAR(36) NOT NULL,
    `role` ENUM('HERO', 'GALLERY', 'POSTER') NOT NULL DEFAULT 'GALLERY',
    `path` VARCHAR(255) NOT NULL,
    `alt` VARCHAR(200) NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `variants_ready` BOOLEAN NOT NULL DEFAULT false,
    `sort_key` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `package_images_path_key`(`path`),
    INDEX `package_images_package_id_role_sort_key_idx`(`package_id`, `role`, `sort_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_log` (
    `id` CHAR(36) NOT NULL,
    `actor_id` CHAR(36) NULL,
    `action` VARCHAR(80) NOT NULL,
    `entity_type` VARCHAR(40) NOT NULL,
    `entity_id` CHAR(36) NOT NULL,
    `before` JSON NULL,
    `after` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_log_entity_type_entity_id_created_at_idx`(`entity_type`, `entity_id`, `created_at`),
    INDEX `audit_log_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_partner_id_fkey` FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_stays` ADD CONSTRAINT `package_stays_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_stays` ADD CONSTRAINT `package_stays_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_features` ADD CONSTRAINT `package_features_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_features` ADD CONSTRAINT `package_features_feature_id_fkey` FOREIGN KEY (`feature_id`) REFERENCES `features`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_partner_id_fkey` FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `season_ranges` ADD CONSTRAINT `season_ranges_season_id_fkey` FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_rates` ADD CONSTRAINT `package_rates_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_rates` ADD CONSTRAINT `package_rates_season_id_fkey` FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_add_ons` ADD CONSTRAINT `package_add_ons_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_images` ADD CONSTRAINT `package_images_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- Hand-written: CHECK constraints Prisma's schema language can't express
-- (docs/packages-api-plan.md §3 invariants). Enforced by MySQL >= 8.0.16;
-- test/schema.e2e-spec.ts in apps/api proves the server really enforces them.
-- ---------------------------------------------------------------------------
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_nights_chk`     CHECK (`min_nights` >= 1 AND `nights` >= `min_nights`),
  ADD CONSTRAINT `packages_party_chk`      CHECK (`adults` >= 1 AND `children` >= 0),
  ADD CONSTRAINT `packages_from_price_chk` CHECK (`from_price_minor` IS NULL OR `from_price_minor` >= 0),
  ADD CONSTRAINT `packages_version_chk`    CHECK (`version` >= 1);

ALTER TABLE `package_stays`
  ADD CONSTRAINT `package_stays_nights_chk` CHECK (`nights` >= 1);

ALTER TABLE `season_ranges`
  ADD CONSTRAINT `season_ranges_order_chk` CHECK (`start_date` <= `end_date`);

ALTER TABLE `package_rates`
  ADD CONSTRAINT `package_rates_price_chk` CHECK (`price_minor` >= 0 AND (`extra_night_price_minor` IS NULL OR `extra_night_price_minor` >= 0));

ALTER TABLE `package_add_ons`
  ADD CONSTRAINT `package_add_ons_price_chk` CHECK (`price_minor` >= 0);

ALTER TABLE `package_images`
  ADD CONSTRAINT `package_images_size_chk` CHECK (`width` > 0 AND `height` > 0);
