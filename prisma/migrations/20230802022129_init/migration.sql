/*
  Warnings:

  - You are about to drop the `LessonResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LessonResult` DROP FOREIGN KEY `LessonResult_userId_fkey`;

-- DropTable
DROP TABLE `LessonResult`;
