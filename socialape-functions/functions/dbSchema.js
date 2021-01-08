let db = {
  users: [
    {
      email: "user@gmail.com",
      userId: "wjsoifwoooeirogioerj",
      handle: "user",
      createdAt: "2020-12-30T15:48:04.872Z",
      website: "mywebsite.com",
      bio: "here's someone",
      location: "london, UK",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      commentCount: 5,
      likeCount: 2,
      createdAt: "2020-12-30T15:48:04.872Z",
      userImage: "",
    },
  ],
  comments: [
    {
      screamId: "obYxqioaU2Ev2lowJkYg",
      createdAt: "2020-12-30T15:48:04.872Z",
      userHandle: "user",
      body: "another comment",
    },
  ],
  notifications: [
    {
      createdAt: "2020-12-30T15:48:04.872Z",
      screamId: "obYxqioaU2Ev2lowJkYg",
      sender: "user",
      receiver: "us3r",
      type: "like | comment",
      read: "true | false",
    },
  ],
};

const userDetails = {
  credentials: {
    email: "user@gmail.com",
    userId: "wjsoifwoooeirogioerj",
    handle: "user",
    createdAt: "2020-12-30T15:48:04.872Z",
    website: "mywebsite.com",
    bio: "here's someone",
    location: "london, UK",
  },
  likes: [
    {
      userHandle: "user",
      screamId: "oeij;foirjeojiro",
    },
  ],
};
