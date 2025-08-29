-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_id_fkey";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
