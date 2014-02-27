// Generated by CoffeeScript 1.6.3
(function() {
  define(['reactive-coffee', 'task'], function(rx, Task) {
    return function(tasks) {
      var bind, button, div, footer, h1, header, incomplete, input, label, li, section, span, strong, ul, _ref;
      Task = (function() {
        function Task(title) {
          this.title = rx.cell(title);
          this.isEditing = rx.cell(false);
          this.isCompleted = rx.cell(false);
        }

        return Task;

      })();
      incomplete = function() {
        var task;
        return ((function() {
          var _i, _len, _ref, _results;
          _ref = tasks.all();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            task = _ref[_i];
            if (!task.isCompleted.get()) {
              _results.push(task);
            }
          }
          return _results;
        })()).length;
      };
      bind = rx.bind;
      _ref = rx.rxt.tags, section = _ref.section, header = _ref.header, footer = _ref.footer, h1 = _ref.h1, strong = _ref.strong, span = _ref.span, input = _ref.input, button = _ref.button, div = _ref.div, label = _ref.label, ul = _ref.ul, li = _ref.li;
      return section({
        id: 'todoapp'
      }, [
        header({
          id: 'header'
        }, [
          h1('todos'), input({
            id: 'new-todo',
            type: 'text',
            placeholder: 'What needs to be done?',
            autofocus: true,
            keydown: function(e) {
              if (e.which === 13) {
                tasks.push(new Task(this.val().trim()));
                this.val('');
                return false;
              }
            }
          })
        ]), div(bind(function() {
          if (tasks.length() === 0) {
            return [];
          } else {
            return [
              section({
                id: 'main'
              }, [
                input({
                  id: 'toggle-all',
                  type: 'checkbox',
                  change: function() {
                    var task, _i, _len, _ref1, _results;
                    _ref1 = tasks.all();
                    _results = [];
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                      task = _ref1[_i];
                      _results.push(task.isCompleted.set(this.is(':checked')));
                    }
                    return _results;
                  }
                }), label({
                  "for": 'toggle-all'
                }, 'Mark all as complete'), ul({
                  id: 'todo-list'
                }, tasks.map(function(task) {
                  var editBox;
                  editBox = null;
                  return li({
                    "class": bind(function() {
                      return [task.isCompleted.get() ? 'completed' : void 0, task.isEditing.get() ? 'editing' : void 0].filter(function(x) {
                        return x != null;
                      }).join(' ');
                    })
                  }, bind(function() {
                    if (task.isEditing.get()) {
                      return [
                        editBox = input({
                          type: 'text',
                          "class": 'edit',
                          autofocus: true,
                          value: task.title.get(),
                          keyup: function(e) {
                            if (e.which === 13) {
                              return this.blur();
                            }
                          },
                          blur: function() {
                            task.title.set(this.val());
                            return task.isEditing.set(false);
                          }
                        })
                      ];
                    } else {
                      return [
                        input({
                          "class": 'toggle',
                          type: 'checkbox',
                          checked: bind(function() {
                            return task.isCompleted.get();
                          }),
                          change: function() {
                            return task.isCompleted.set(this.is(':checked'));
                          }
                        }), label({
                          dblclick: function() {
                            task.isEditing.set(true);
                            return editBox.focus();
                          }
                        }, bind(function() {
                          return "" + (task.title.get());
                        })), button({
                          "class": 'destroy',
                          click: function() {
                            return tasks.remove(task);
                          }
                        })
                      ];
                    }
                  }));
                }))
              ]), footer({
                id: 'footer'
              }, [
                span({
                  id: 'todo-count'
                }, bind(function() {
                  return [strong("" + (incomplete())), incomplete() === 1 ? ' item left' : ' items left'];
                })), button({
                  id: 'clear-completed',
                  click: function() {
                    var task;
                    return tasks.replace((function() {
                      var _i, _len, _ref1, _results;
                      _ref1 = tasks.all();
                      _results = [];
                      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                        task = _ref1[_i];
                        if (!task.isCompleted.get()) {
                          _results.push(task);
                        }
                      }
                      return _results;
                    })());
                  }
                }, 'Clear completed')
              ])
            ];
          }
        }))
      ]);
    };
  });

}).call(this);