-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'dokter', 'pemilik') NOT NULL DEFAULT 'pemilik',
    `no_telp` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hewan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `spesies` VARCHAR(191) NOT NULL,
    `umur` INTEGER NOT NULL,
    `pemilik_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rekam_medis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hewan_id` INTEGER NOT NULL,
    `keluhan` VARCHAR(191) NOT NULL,
    `diagnosis` VARCHAR(191) NULL,
    `resep_obat` VARCHAR(191) NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hewan` ADD CONSTRAINT `hewan_pemilik_id_fkey` FOREIGN KEY (`pemilik_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_hewan_id_fkey` FOREIGN KEY (`hewan_id`) REFERENCES `hewan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
