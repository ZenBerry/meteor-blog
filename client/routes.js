Router.route('/', {
  template: ''
});

Router.route('/@/:nickname', {
  waitOn: function () {
    console.log(this.params.nickname)
    return Meteor.subscribe('posts', this.params.nickname);
  }
});