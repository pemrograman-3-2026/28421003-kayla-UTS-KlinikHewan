-- DropForeignKey
ALTER TABLE `hewan` DROP FOREIGN KEY `hewan_pemilik_id_fkey`;

-- DropForeignKey
ALTER TABLE `rekam_medis` DROP FOREIGN KEY `rekam_medis_hewan_id_fkey`;

-- DropIndex
DROP INDEX `hewan_pemilik_id_fkey` ON `hewan`;

-- DropIndex
DROP INDEX `rekam_medis_hewan_id_fkey` ON `rekam_medis`;

-- AddForeignKey
ALTER TABLE `hewan` ADD CONSTRAINT `hewan_pemilik_id_fkey` FOREIGN KEY (`pemilik_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_hewan_id_fkey` FOREIGN KEY (`hewan_id`) REFERENCES `hewan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
