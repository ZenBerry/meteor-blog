import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  student = new Mongo.Collection('student');
});
