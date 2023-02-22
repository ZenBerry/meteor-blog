import './main.html';
import { Mongo } from 'meteor/mongo';
posts = new Mongo.Collection('posts');

// Tracker.autorun(function() {
//   console.log(Meteor.user());
// });

Template.Insert.events({
  'click .post-button': function(event) { // Function which gets Activated on Click of Insert
    // Taking the Value in Registers
    var d_post = $('#input').val();
    // Mongo Query to Insert into Collection posts
    posts.insert({
      post: d_post,
      userId: Meteor.userId(),
    });
    // Clear the Input After Inserting
    document.getElementById('input').value = "";
  }
});
Template.body.helpers({ // Function that Displays all the Records
  'resolutions': function() {
    console.log(Meteor.userId());
    return posts.find({userId: Meteor.userId()});
  }
});
Template.resolution.events({
  'click .delete-post-button': function() {
    posts.remove(this._id);
    // this._id selects the item associated to the button in the UI
  }
});
