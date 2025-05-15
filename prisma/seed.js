const { prisma } = require("../common");

async function main() {
  await prisma.User.create({
    data: {
      id: "c9b7dbdc-792d-488e-8b11-a91d0c6e9b7c",
      username: "ha",
      email: "ha",
      password: "ha",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/1747175693018_1745958211348_QRCode_7061.png",
    },
  });
  const item = await prisma.Item.create({
    data: {
      id: "211e548c-be2d-4f53-b441-0566b538290c.wav",
      user: "c9b7dbdc-792d-488e-8b11-a91d0c6e9b7c",
      name: "sampled infinite",
      description: "samplerinfinite ROCKS!",
    },
  });
  const comment = await prisma.Comment.create({
    data: {
      id: "testingblahblah",
      commentText: "Wow, this goes hard",
      itemID: "211e548c-be2d-4f53-b441-0566b538290c.wav",
      userID: "c9b7dbdc-792d-488e-8b11-a91d0c6e9b7c",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "c9b7dbdc-792d-488e-8b11-a91d0c6e9b7c",
      commentID: "testingblahblah",
      reactionType: "like",
    },
  });
  console.log("Successful seeding!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
