import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
  student = new Mongo.Collection('student');
  ServiceConfiguration.configurations.upsert({
    service: "google"
  }, {
    $set: {
      clientId: "423385515973-37c6a8lb4e8qukqbq67d943kg2r9a91p.apps.googleusercontent.com",
      secret: "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"
    }
  });
});
