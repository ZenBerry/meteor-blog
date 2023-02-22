import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';


Meteor.startup(() => {
  posts = new Mongo.Collection('posts');

  posts.allow({

    insert: function (userId) {
      // Only allow inserts for the current user
      return userId === userId;
    },

    update: function (userId, doc, fields, modifier) {
      // Only allow updates for the current user
      return userId === userId;
    },
    remove: function (userId, doc) {
      // Only allow removes for the current user
      return userId === userId;
    },
    fetch: ['userId']
  });

  ServiceConfiguration.configurations.upsert({
    service: "google"
  }, {
    $set: {
      clientId: "423385515973-37c6a8lb4e8qukqbq67d943kg2r9a91p.apps.googleusercontent.com",
      secret: "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"
    }
  });


  Accounts.validateNewUser(function (user) {
    console.log('new user created');

    // Generate a unique nickname based on the user's profile name
    const nickname = generateUniqueNickname(user.profile.name);
    
    // Add the nickname to the user's profile
    user.profile.nickname = nickname;

    // user.userId = Meteor.userId()

    return true;
  });

  function generateUniqueNickname(name) {
    // Convert the name to a lowercase string with no spaces
    const nickname = name.toLowerCase().replace(/\s+/g, '');
    
    // Check if the nickname already exists in the database
    const existingUser = Meteor.users.findOne({ 'profile.nickname': nickname });
    if (!existingUser) {
      // If the nickname is unique, return it
      return nickname;
    } else {
      // If the nickname is not unique, append a number to it and try again
      let i = 1;
      while (true) {
        const newNickname = nickname + i;
        const existingUser = Meteor.users.findOne({ 'profile.nickname': newNickname });
        if (!existingUser) {
          return newNickname;
        }
        i++;
      }
    }
  }


});
