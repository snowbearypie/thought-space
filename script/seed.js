'use strict'

const db = require('../server/db')
const {User, Hub, Node} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      displayName: 'Code-E the Pug'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      displayName: 'Murph-O-Tronic'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  //make sample hubs for Cody
  const sampleHubs = [
    {
      name: 'My Recipes',
      description: 'A place to store my favorite recipes, like puppy chow!',
      hubTag: 'Recipes',
      voteCount: 1,
      isPrivate: false,
      userId: 1
    },
    {
      name: "Bailey's Surprise",
      description:
        'Notes and plans to help me make the best surprise party for my best friend!',
      hubTag: "Bailey's Surprise party",
      voteCount: 0,
      userId: 1
    },
    {
      name: 'Favorite Parks',
      description:
        'My owner keeps taking me to the park next door, but this list is for when I go on big road trip!',
      hubTag: 'Parks',
      voteCount: 1,
      isPrivate: false,
      userId: 1
    }
  ]

  //bulk create hubs in database
  const hubs = await Hub.bulkCreate(sampleHubs)
  console.log('Seeded Hubs')

  //make sample nodes for Cody's hubs
  const sampleNodes = [
    {
      name: 'Puppy Chow',
      description:
        'Melt equal parts of chocolate (semi-sweet or dark) and peanut butter together. Start by warming it for 60 seconds, stir and then warm in increments of 30 seconds so you don’t make it too hot! The chocolate peanut butter mixture together until it’s smooth and glossy. Next, put some cereal in the bottom of a large bowl, pour some of the peanut butter/chocolate mixture on top, and continue to alternate cereal/chocolate/cereal, etc. until you’ve used up all the ingredients. The key here is to start VERY conservatively with the amount of cereal! You do not, I repeat, do not want to use too much cereal. It will ruin your puppy chow, and consequently, your day. Next, mix it all together, making sure the cereal is thickly coated . Then put the muddy buddies somewhere to cool off (outside in the winter, or in the refrigerator) before adding any powdered sugar. This step is absolutely crucial. I am not into sickeningly  sweet desserts, so I like to use as little powdered sugar as possible. If you add the powdered sugar while the mixture is still warm it will soak right in and won’t help separate the chunks at all. Making sure your mixture is slightly cooled will mean you can use less powdered sugar in the end. Once the mixture is at or just below room temperature, but not hard, add the powdered sugar until there is a thin coating and some of the pieces start separating. It’s helpful to use a bowl with a lid, so you can shake it to coat the cereal evenly. Next, let the muddy buddies cool down even more (for about 15 or 20 more minutes) before adding a little more powdered sugar. You want to add just enough so that the puppy chow can be eaten without making your hands a chocolatey-mess. Let the puppy chow sit at room temperature for about 2 hours until it’s hardened. This process can be expedited in the refrigerator. Just be sure to serve it at room temperature!',
      nodeTag: 'Puppy Chow',
      voteCount: 2,
      isPrivate: false,
      userId: 1,
      hubId: 1
    },
    {
      name: 'Puppy Chow Cake',
      description:
        "Step 1: Make Puppy Chow.  Step 2: form into cake.  Step 3: Don't eat cake and bring to Bailey",
      voteCount: 1,
      userId: 1,
      hubId: 2
    },
    {
      name: 'Montrose Dog Beach',
      description: '601 W LAWRENCE AVE., CHICAGO, IL',
      nodeTag: 'Montrose Beach',
      voteCount: 1,
      isPrivate: false,
      userId: 1,
      hubId: 3
    }
  ]

  //bulk create hubs in database
  const nodes = await Node.bulkCreate(sampleNodes)
  console.log('Seeded Nodes')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
