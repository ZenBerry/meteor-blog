import './main.html';
import { Mongo } from 'meteor/mongo';
import './routes.js';
import { Router } from 'meteor/iron:router';
Accounts.onLogin(function(info) {
  if (info && info.type !== 'resume') {
    Router.go('/@/' + Meteor.user().profile.nickname)
  }
});
posts = new Mongo.Collection('posts');
Template.Insert.events({
  'click .post-button': function(event) {
    const routerNick = Router.current().params.nickname
    const myCurrentNick = Meteor.user().profile.nickname
    let d_post;
    let postId = Session.get('editingPostId'); // get the ID of the post being edited (if any)
    //Taking the Value from input
    d_post = $('#input').val();
    if (routerNick === myCurrentNick) {
      if (postId) {
        // if we're editing an existing post, update the corresponding document in the posts collection
        posts.update(postId, {
          $set: {
            post: d_post
          }
        });
        // reset the editing post ID so the form will create a new post on next submit
        Session.set('editingPostId', null);
      } else {
        // if we're not editing an existing post, insert a new document into the posts collection
        console.log('Inserting meteor user', Meteor.user())
        posts.insert({
          post: d_post,
          nickname: myCurrentNick,
          userId: Meteor.userId()
        });
      }
    } else {
      console.log('Not your blog mate!')
    }
    //Clear the Input After Inserting/Updating
    document.getElementById('input').value = '';
  }
});
Template.body.helpers({
  'resolutions': function() {
    if (Template.instance().subscriptionsReady()) {
      return posts.find({
        nickname: Router.current().params.nickname
      });
    }
    return posts.find({
      userId: Meteor.userId()
    });
  },
  'nickname': function() {
    return Router.current().params.nickname;
  },
  'is_your_blog': function() {
    return Router.current().params.nickname === Meteor.user().profile.nickname
  }
});

Template.resolution.helpers({
  'is_your_blog': function() {
    return Router.current().params.nickname === Meteor.user().profile.nickname
  }
})

Template.resolution.events({
  'click .delete-post-button': function() {
    const routerNick = Router.current().params.nickname
    const myCurrentNick = Meteor.user().profile.nickname //todo: avoid defining these twice
    if (routerNick === myCurrentNick) {
      posts.remove(this._id);
    } else {
      console.log('Not your blog mate!')
    }
  },
  'click .edit-post-button': function(event) {
    let doc = posts.findOne({ _id: this._id });
    document.getElementById('input').value = doc.post
    Session.set('editingPostId', this._id);
  }
});