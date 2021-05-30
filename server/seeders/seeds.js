const faker = require('faker');

const thumb = '../../client/src/assets/images/thumbnailSeeder.jpg';

const db = require('../config/connection');
const { Fret, User } = require('../models');

db.once('open', async () => {
  await Fret.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 5; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);


  // create frets
  let createdFrets = [];
  for (let i = 0; i < 5; i += 1) {
    const fretText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const webformatURL = thumb;
    const title = faker.lorem.words(Math.round(Math.random() * 7) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdFret = await Fret.create({ webformatURL, title, fretText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { frets: createdFret._id } }
    );

    createdFrets.push(createdFret);
  }

  // create feedback
  for (let i = 0; i < 5; i += 1) {
    const feedbackBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomFretIndex = Math.floor(Math.random() * createdFrets.length);
    const { _id: fretId } = createdFrets[randomFretIndex];

    await Fret.updateOne(
      { _id: fretId },
      { $push: {feedbacks: { feedbackBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
