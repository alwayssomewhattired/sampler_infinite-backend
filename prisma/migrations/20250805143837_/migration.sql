-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "itemsId" TEXT;

-- AlterTable
ALTER TABLE "ItemReaction" ADD COLUMN     "itemsId" TEXT;

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "itemIDS" TEXT[],
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemReaction" ADD CONSTRAINT "ItemReaction_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
