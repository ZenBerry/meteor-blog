Router.route('/', {
  template: ''
});

Router.route('/@/:nickname', {
  waitOn: function () {
    return Meteor.subscribe('posts', this.params.nickname);
  }
});