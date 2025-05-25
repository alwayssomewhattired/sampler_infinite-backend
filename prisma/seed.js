const wav = {
  //   "Alien Drums": [
  //     "00368d9a-3422-4020-ba5e-3db291a76ab6.wav",
  //     "Some drum sounds with a distorted drone",
  //   ],
  //   "Same Piano": [
  //     "0cfdca09-90df-4685-ba2c-96bef006d498.wav",
  //     "Constant piano note with a little drum noise",
  //   ],
  "Male Note": [
    "0da3e2ff-1777-42a3-b840-d32b62f91623.wav",
    "Continuous single male note with smooth pop background",
  ],
  "Ambient Phone": [
    "143fef79-50aa-4b99-be4a-28bcece5fe62.wav",
    "One wave of ambient flip-phone quality",
  ],
  "Indian Street Insanity": [
    "0a14553b-f920-4c9e-84ca-a676a22eb9ab.wav",
    "Sounds like the busy streets of South Asia",
  ],
  "Balloon Strings": [
    "0ff3fdc7-fa19-4071-9da8-e1acac0e74d2.wav",
    "Sounds like stretched plastic being plucked",
  ],
  "Female Note": [
    "14f5d4f5-81a3-4746-b81c-bf2c9880b3f5.wav",
    "She sounds nice",
  ],
  "Space Ambience": [
    "211e548c-be2d-4f53-b441-0566b538290c.wav",
    "INTERPLANETARY MUSIC!!!",
  ],
  "Creepy Buzz": [
    "2d698d05-6e6e-49c2-b248-12c4ae28069f.wav",
    "This is a weird one...",
  ],
  Royal: [
    "42525738-e7f7-4bef-bfec-c5b7a5e472b9.wav",
    "Take a trip through what feels like an old fantasy rpg.",
  ],
  "soft/heavy": [
    "42ddedf1-56ba-4eb1-aadf-0b52eadafe84.wav",
    "Ups and downs like this so-called LIFE :)",
  ],
  "old-time stutter": [
    "57c34936-d743-459a-9081-518993cb57e7.wav",
    "dinosaur recording of speech",
  ],
  "EXTREME ARCADE": [
    "5d4ef0b9-bf95-45bd-bd87-bc088b7234f7.wav",
    "Intense arcade match",
  ],
  "Vintage Strings": [
    "6e4d6b00-a587-4747-87b0-993d11e358b3.wav",
    "old Italian 60's flick??",
  ],
  "PiAnO gLiTcH": [
    "8dd4d80d-1c8d-4a85-a9e3-48fc12f722df.wav",
    "a grand piano with glitch",
  ],
  "Resonant Synth": [
    "d9a24160-2ba1-4f65-bff0-13e2698c9cc5.wav",
    "all hail the resonant synth",
  ],
  "Fast Marimba": [
    "dbd10a19-af8e-425a-b894-35f853ee7424.wav",
    "A marimba played fast. Like really fast",
  ],
  "BEAUTIFUL AMBIENCE": [
    "1cf6ee35-9759-4efd-bd4b-19d97bf1a537.wav",
    "All caps because this is very good",
  ],
  "evil jello": [
    "25bea1f0-8241-4350-8746-749aa04dd1cb.wav",
    "spooky sounds with evil jello",
  ],
  "Crystal Crash": [
    "87ef0dc5-7a7b-48c8-a1b4-e812fecee444.wav",
    "fades in with surreal ambience and switches to a more noisy version",
  ],
};

const { prisma } = require("../common");

async function main() {
  await prisma.User.create({
    data: {
      id: "usertest1",
      username: "galacticwarlord",
      email: "ha",
      password: "ha",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num1.webp",
    },
  });
  await prisma.Item.create({
    data: {
      id: "00368d9a-3422-4020-ba5e-3db291a76ab6.wav",
      user: "usertest1",
      name: "Alien Drums",
      description: "Some drum sounds with a distorted drone",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest1",
      commentText: "Wow, this goes hard",
      itemID: "00368d9a-3422-4020-ba5e-3db291a76ab6.wav",
      userID: "usertest1",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest1",
      commentID: "commenttest1",
      reactionType: "like",
    },
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  await prisma.User.create({
    data: {
      id: "usertest2",
      username: "Maximum-Power",
      email: "usertest2",
      password: "usertest2",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num2.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "0cfdca09-90df-4685-ba2c-96bef006d498.wav",
      user: "usertest2",
      name: "Same Piano",
      description: "Constant piano note with a little drum noise",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest2",
      commentText: "Much alien indeed",
      itemID: "00368d9a-3422-4020-ba5e-3db291a76ab6.wav",
      userID: "usertest2",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest2",
      commentID: "commenttest1",
      reactionType: "like",
    },
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest3",
      username: "xxROFLxx",
      email: "usertest3",
      password: "usertest3",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num3.svg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "0da3e2ff-1777-42a3-b840-d32b62f91623.wav",
      user: "usertest3",
      name: "Male Note",
      description: "Continuous single male note with smooth pop background",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest3",
      commentText: "tbh this is cacophonous",
      itemID: "0cfdca09-90df-4685-ba2c-96bef006d498.wav",
      userID: "usertest3",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest3",
      commentID: "commenttest1",
      reactionType: "dislike",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest4",
      username: "patrick_marxis",
      email: "usertest4",
      password: "usertest4",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num4.webp",
    },
  });
  await prisma.Item.create({
    data: {
      id: "42525738-e7f7-4bef-bfec-c5b7a5e472b9.wav",
      user: "usertest4",
      name: "Royal",
      description: "Take a trip through what feels like an old fantasy rpg.",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest4",
      commentText: "the female version of this is better",
      itemID: "0da3e2ff-1777-42a3-b840-d32b62f91623.wav",
      userID: "usertest4",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest4",
      commentID: "commenttest3",
      reactionType: "like",
    },
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest5",
      username: "kyliegenz",
      email: "usertest5",
      password: "usertest5",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num5.png",
    },
  });
  await prisma.Item.create({
    data: {
      id: "1cf6ee35-9759-4efd-bd4b-19d97bf1a537.wav",
      user: "usertest5",
      name: "BEAUTIFUL AMBIENCE",
      description: "All caps because this is very good",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest5",
      commentText: "* new runescape be like",
      itemID: "42525738-e7f7-4bef-bfec-c5b7a5e472b9.wav",
      userID: "usertest5",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest5",
      commentID: "commenttest4",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest6",
      username: "thebackpedaler",
      email: "usertest6",
      password: "usertest6",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num6.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "8dd4d80d-1c8d-4a85-a9e3-48fc12f722df.wav",
      user: "usertest6",
      name: "PiAnO gLiTcH",
      description: "a grand piano with glitch",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest6",
      commentText: "this one is my favorite!! :3",
      itemID: "1cf6ee35-9759-4efd-bd4b-19d97bf1a537.wav",
      userID: "usertest6",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest6",
      commentID: "commenttest4",
      reactionType: "dislike",
    },
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest7",
      username: "ryan",
      email: "usertest7",
      password: "usertest7",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num7.webp",
    },
  });
  await prisma.Item.create({
    data: {
      id: "5d4ef0b9-bf95-45bd-bd87-bc088b7234f7.wav",
      user: "usertest7",
      name: "EXTREME ARCADE",
      description: "Intense arcade match",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest7",
      commentText: "all caps necessary",
      itemID: "8dd4d80d-1c8d-4a85-a9e3-48fc12f722df.wav",
      userID: "usertest7",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest7",
      commentID: "commenttest5",
      reactionType: "like",
    },
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest8",
      username: "ashphalttopave11",
      email: "usertest8",
      password: "usertest8",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num8.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "0ff3fdc7-fa19-4071-9da8-e1acac0e74d2.wav",
      user: "usertest8",
      name: "Balloon Strings",
      description: "Sounds like stretched plastic being plucked",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest8",
      commentText: "stealing this...",
      itemID: "1cf6ee35-9759-4efd-bd4b-19d97bf1a537.wav",
      userID: "usertest8",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest8",
      commentID: "commenttest6",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest9",
      username: "barry7xbarry",
      email: "usertest9",
      password: "usertest9",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num9.webp",
    },
  });
  await prisma.Item.create({
    data: {
      id: "211e548c-be2d-4f53-b441-0566b538290c.wav",
      user: "usertest9",
      name: "Space Ambience",
      description: "INTERPLANETARY MUSIC!!!",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest9",
      commentText: "Autechre???",
      itemID: "0ff3fdc7-fa19-4071-9da8-e1acac0e74d2.wav",
      userID: "usertest9",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest9",
      commentID: "commenttest5",
      reactionType: "like",
    },
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest10",
      username: "ctrlshift",
      email: "usertest10",
      password: "usertest10",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num10.png",
    },
  });
  await prisma.Item.create({
    data: {
      id: "87ef0dc5-7a7b-48c8-a1b4-e812fecee444.wav",
      user: "usertest10",
      name: "Crystal Crash",
      description:
        "fades in with surreal ambience and switches to a more noisy version",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest10",
      commentText: "ALL hail sun-ra!",
      itemID: "211e548c-be2d-4f53-b441-0566b538290c.wav",
      userID: "usertest10",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest10",
      commentID: "commenttest2",
      reactionType: "dislike",
    },
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest11",
      username: "joansaj",
      email: "usertest11",
      password: "usertest11",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num11.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "143fef79-50aa-4b99-be4a-28bcece5fe62.wav",
      user: "usertest11",
      name: "Ambient Phone",
      description: "One wave of ambient flip-phone quality",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest11",
      commentText: "This will be useful for asmr.",
      itemID: "0ff3fdc7-fa19-4071-9da8-e1acac0e74d2.wav",
      userID: "usertest11",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest11",
      commentID: "commenttest7",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest12",
      username: "lkalka",
      email: "usertest12",
      password: "usertest12",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num12.jpeg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "57c34936-d743-459a-9081-518993cb57e7.wav",
      user: "usertest12",
      name: "old-time stutter",
      description: "dinosaur recording of speech",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest12",
      commentText: "Cool sample!!!!",
      itemID: "143fef79-50aa-4b99-be4a-28bcece5fe62.wav",
      userID: "usertest12",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest12",
      commentID: "commenttest10",
      reactionType: "dislike",
    },
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest13",
      username: "cormierXD",
      email: "usertest13",
      password: "usertest13",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num13.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "dbd10a19-af8e-425a-b894-35f853ee7424.wav",
      user: "usertest13",
      name: "Fast Marimba",
      description: "A marimba played fast. Like really fast",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest13",
      commentText: "I don't really understand what's being said",
      itemID: "57c34936-d743-459a-9081-518993cb57e7.wav",
      userID: "usertest13",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest9",
      commentID: "commenttest10",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest14",
      username: "punchAttackcombo",
      email: "usertest14",
      password: "usertest14",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num14.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "0a14553b-f920-4c9e-84ca-a676a22eb9ab.wav",
      user: "usertest14",
      name: "Indian Street Insanity",
      description: "Sounds like the busy streets of South Asia",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest14",
      commentText: "'not quite my tempo'",
      itemID: "dbd10a19-af8e-425a-b894-35f853ee7424.wav",
      userID: "usertest14",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest14",
      commentID: "commenttest13",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest15",
      username: "LauraSanders",
      email: "usertest15",
      password: "usertest15",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num15.avif",
    },
  });
  await prisma.Item.create({
    data: {
      id: "42ddedf1-56ba-4eb1-aadf-0b52eadafe84.wav",
      user: "usertest15",
      name: "soft/heavy",
      description: "Ups and downs like this so-called LIFE :)",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest15",
      commentText: "now this takes me back",
      itemID: "0a14553b-f920-4c9e-84ca-a676a22eb9ab.wav",
      userID: "usertest15",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest15",
      commentID: "commenttest10",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest16",
      username: "joeyobama",
      email: "usertest16",
      password: "usertest16",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num16.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "6e4d6b00-a587-4747-87b0-993d11e358b3.wav",
      user: "usertest16",
      name: "Vintage Strings",
      description: "old Italian 60's flick??",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest16",
      commentText: "nice",
      itemID: "42ddedf1-56ba-4eb1-aadf-0b52eadafe84.wav",
      userID: "usertest16",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest16",
      commentID: "commenttest14",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest17",
      username: "slimer",
      email: "usertest17",
      password: "usertest17",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num17.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "14f5d4f5-81a3-4746-b81c-bf2c9880b3f5.wav",
      user: "usertest17",
      name: "Female Note",
      description: "She sounds nice",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest17",
      commentText: "mama-mia!!",
      itemID: "6e4d6b00-a587-4747-87b0-993d11e358b3.wav",
      userID: "usertest17",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest17",
      commentID: "commenttest16",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest18",
      username: "Get_Comfortable",
      email: "usertest18",
      password: "usertest18",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num18.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "d9a24160-2ba1-4f65-bff0-13e2698c9cc5.wav",
      user: "usertest18",
      name: "Resonant Synth",
      description: "Slight resonance. I thought it was kinda cool",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest18",
      commentText: "This is oddly nostalgic",
      itemID: "6e4d6b00-a587-4747-87b0-993d11e358b3.wav",
      userID: "usertest18",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest18",
      commentID: "commenttest4",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest19",
      username: "doctorginseng",
      email: "usertest19",
      password: "usertest19",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num19.png",
    },
  });
  await prisma.Item.create({
    data: {
      id: "2d698d05-6e6e-49c2-b248-12c4ae28069f.wav",
      user: "usertest19",
      name: "Creepy Buzz",
      description: "This is a weird one...",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest19",
      commentText: "woah, this is trippy",
      itemID: "14f5d4f5-81a3-4746-b81c-bf2c9880b3f5.wav",
      userID: "usertest19",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest19",
      commentID: "commenttest14",
      reactionType: "like",
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  await prisma.User.create({
    data: {
      id: "usertest20",
      username: "aloneindarkness",
      email: "usertest20",
      password: "usertest20",
      photoId:
        "https://samplerinfinite-profile-photos.s3.us-east-2.amazonaws.com/profiles/num20.jpg",
    },
  });
  await prisma.Item.create({
    data: {
      id: "25bea1f0-8241-4350-8746-749aa04dd1cb.wav",
      user: "usertest20",
      name: "evil jello",
      description: "spooky sounds with evil jello",
    },
  });
  await prisma.Comment.create({
    data: {
      id: "commenttest20",
      commentText: "amen",
      itemID: "42ddedf1-56ba-4eb1-aadf-0b52eadafe84.wav",
      userID: "usertest20",
    },
  });

  await prisma.CommentReaction.create({
    data: {
      userID: "usertest20",
      commentID: "commenttest6",
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
