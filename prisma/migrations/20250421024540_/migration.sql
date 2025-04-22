-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_itemID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userID_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
