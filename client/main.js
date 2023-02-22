import './main.html';
import {Mongo} from 'meteor/mongo';
import './routes.js';

posts = new Mongo.Collection('posts');

Template.Insert.events({
  'click .post-button': function(event) {
    let d_post;
    let postId = Session.get('editingPostId'); // get the ID of the post being edited (if any)
    //Taking the Value from input
    d_post = $('#input').val();
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
        nickname: Meteor.user().profile.nickname,
        userId: Meteor.userId()
      });
    }
    //Clear the Input After Inserting/Updating
    document.getElementById('input').value = '';
  }
});

Template.body.helpers({
  'resolutions': function() {
    console.log(Meteor.userId());

    if (Template.instance().subscriptionsReady()) {
      console.log('haha3',Router.current().params.nickname)
      return posts.find({
        nickname: Router.current().params.nickname
      });
    }

    return posts.find({
      userId: Meteor.userId()
    });
  }
});

Template.resolution.events({
  'click .delete-post-button': function() {
    posts.remove(this._id);
  },

  'click .edit-post-button':function(event)
  {
    let doc = posts.findOne({_id: this._id});
    document.getElementById('input').value = doc.post
    Session.set('editingPostId', this._id);
  }

});

