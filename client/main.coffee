import './main.html';
import { Mongo } from 'meteor/mongo';
posts = new Mongo.Collection('posts');

Template.Insert.events 'click .post-button': (event) ->
  
  #Taking the Value in Registers
  d_post = $('#input').val()
  
  #Mongo Query to Insert into Collection posts
  posts.insert
    post: d_post
    userId: Meteor.userId()
    
  #Clear the Input After Inserting
  document.getElementById('input').value = ''
  return

Template.body.helpers 'resolutions': ->
  console.log Meteor.userId()
  posts.find userId: Meteor.userId()

Template.resolution.events 'click .delete-post-button': ->
  posts.remove @_id
  # @._id selects the item associated to the button in the UI
  return