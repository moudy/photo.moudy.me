window.App.MouseMoveMonitor = Backbone.Model.extend({
  TIMER: 2000

, initialize: function () {
    this._timerCount = 0;
  }

, start: function () {
    this.stop();
    this._startTimer();
  }

, _startTimer: function () {
    $(window).on('mousemove.mouseMoveMonitor',  this.resetCount.bind(this));
    this._stopped = false;
    this._timer = window.setTimeout(this.onTimer.bind(this), this.TIMER);
  }

, resetCount: function () {
    this._timerCount = 0;
    this.trigger('tick', this, this._timerCount);
  }

, stop: function () {
    $(window).off('mousemove.mouseMoveMonitor');
    window.clearTimeout(this._timer);
    this._timerCount = 0;
    this._stopped = true;
  }

, onTimer: function () {
    this._timerCount++
    this.trigger('tick', this, this._timerCount);
    if (!this._stopped) this._startTimer()
  }

});
