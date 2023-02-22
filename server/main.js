import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

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
});
