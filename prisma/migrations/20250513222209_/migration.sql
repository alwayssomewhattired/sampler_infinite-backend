-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_user_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
