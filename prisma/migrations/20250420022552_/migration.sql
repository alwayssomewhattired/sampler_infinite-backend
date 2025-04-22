/*
  Warnings:

  - You are about to drop the column `reviewID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewID_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_itemID_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userID_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "reviewID",
ALTER COLUMN "userID" DROP NOT NULL,
ALTER COLUMN "itemID" DROP NOT NULL;

-- DropTable
DROP TABLE "Review";
