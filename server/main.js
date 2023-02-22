import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
  student = new Mongo.Collection('student');
  ServiceConfiguration.configurations.upsert({
    service: "google"
  }, {
    $set: {
      clientId: "<your client ID>",
      secret: "<your client secret>"
    }
  });
});
