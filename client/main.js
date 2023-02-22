var posts;

import './main.html';

import {
  Mongo
} from 'meteor/mongo';

posts = new Mongo.Collection('posts');

Template.Insert.events({
  'click .post-button': function(event) {
    var d_post;
    
    //Taking the Value in Registers
    d_post = $('#input').val();
    
    //Mongo Query to Insert into Collection posts
    posts.insert({
      post: d_post,
      userId: Meteor.userId()
    });
    
    //Clear the Input After Inserting
    document.getElementById('input').value = '';
  }
});

Template.body.helpers({
  'resolutions': function() {
    console.log(Meteor.userId());
    return posts.find({
      userId: Meteor.userId()
    });
  }
});

Template.resolution.events({
  'click .delete-post-button': function() {
    posts.remove(this._id);
  }
});

// @._id selects the item associated to the button in the UI

//# sourceMappingURL=main.js.map
