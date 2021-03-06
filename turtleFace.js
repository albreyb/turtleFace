

var Hacker = Backbone.Model.extend({
  defaults: function() {
    return {
      name: 'George Clooney',
      image: 'http://www.nndb.com/people/763/000022697/george-clooney.jpg',
      nameHidden: true
    };
  },
  initialize: function() {
  },
  showName: function() {
    console.log('came in');
    this.set('nameHidden', false);
  }
});

var Cohort = Backbone.Collection.extend({
  model: Hacker,
  initialize: function() {
    console.log("madness");
  }
});

var HackerView = Backbone.View.extend({
  tagName: 'div',
  events: {
    'click': 'showName',
  },
  initialize: function() {
    console.log('ive been changed');
    this.render();
    this.model.on('change', function(){
      this.render();
    }, this);
  },
  render: function(){
    var html = '';
    html += '<img src=' + this.model.get('image') + '>';
    html += '<div class="hackerName"><p';
    if (this.model.get('nameHidden')) {
      html += ' class="hidden"';
    }
    html += '>' + this.model.get('name') + '</p></div>';
    return this.$el.html(html);
  },
  // showName: function() {
  //   console.log("crap");
  //   this.$el.find('.hidden').removeClass('hidden');
  // }
  showName: function(){
    return this.model.showName();
  }
});

var CohortDisplayView = Backbone.View.extend({
  tagName: 'div',
  initialize: function(){
    this.render();
  },
  render: function(){
    var imageNode = '<p>Hey Im Cohort View</p>';
    var hackerView = new HackerView({ model: this.collection.at(0) });
    imageNode = hackerView.$el;
    return this.$el.html(imageNode).attr('id', 'pictureFrame');
  }
});

var CohortNavView = Backbone.View.extend({
  tagName: 'div',
  initialize: function(){
    this.render();
  },
  render: function(){
   return this.$el.html('<p>Hey Im Cohort NavView</p>');
  }
});

console.log("===== MAIN BODY =====");
var hacker = new Hacker({
  name: 'George Clooney',
  image: 'http://www.nndb.com/people/763/000022697/george-clooney.jpg'
});
var cohort = new Cohort(hacker);
var cohortView = new CohortDisplayView({ collection: cohort});
var cohortNavView = new CohortNavView(cohort);
$(function(){
  $('#navView').append(cohortNavView.$el);
  $('#displayView').append(cohortView.$el);
});
