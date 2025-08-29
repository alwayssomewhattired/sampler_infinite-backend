-- CreateTable
CREATE TABLE "ItemsReaction" (
    "userID" TEXT NOT NULL,
    "itemID" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,

    CONSTRAINT "ItemsReaction_pkey" PRIMARY KEY ("userID","itemID")
);

-- AddForeignKey
ALTER TABLE "ItemsReaction" ADD CONSTRAINT "ItemsReaction_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsReaction" ADD CONSTRAINT "ItemsReaction_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
