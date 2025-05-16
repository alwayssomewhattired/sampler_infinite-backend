-- CreateTable
CREATE TABLE "ItemReaction" (
    "userID" TEXT NOT NULL,
    "itemID" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,

    CONSTRAINT "ItemReaction_pkey" PRIMARY KEY ("userID","itemID")
);

-- AddForeignKey
ALTER TABLE "ItemReaction" ADD CONSTRAINT "ItemReaction_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemReaction" ADD CONSTRAINT "ItemReaction_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
