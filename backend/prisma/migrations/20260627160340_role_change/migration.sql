/*
  Warnings:

  - You are about to drop the column `response` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `role` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'assistant');

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "response",
ADD COLUMN     "role" "Role" NOT NULL;
