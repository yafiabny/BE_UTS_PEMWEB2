/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seminars` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nim]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pembicara_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_category_id_fkey";

-- DropForeignKey
ALTER TABLE "seminars" DROP CONSTRAINT "seminars_category_id_fkey";

-- DropForeignKey
ALTER TABLE "seminars" DROP CONSTRAINT "seminars_speaker_id_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "pembicara_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
ADD COLUMN     "nim" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "seminars";

-- CreateTable
CREATE TABLE "category_events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nim_key" ON "users"("nim");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pembicara_id_fkey" FOREIGN KEY ("pembicara_id") REFERENCES "pembicaras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
