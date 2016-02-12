$.fn.slider = function() {
	var self = this;
	
	self.append('<div id=\'handle\'></div>');
	self.append('<div id=\'line\'</div>');
	self.append('<div id=\'number\'</div>');
	var handle = $('#handle');
	var line = $('#line');
	var number = $('#number');

	self.css({
		width: 300,
		position: 'absolute'
	});

	handle.css({
		width: 10,
		height: 50,
		backgroundColor: 'gray',
		position: 'relative',
		left: 0,
		top: 0
	});

	line.css({
		width: self.css('width'),
		height: 2,
		backgroundColor: 'gray',
		position: 'relative',
		top: (-1/2) * handle.height()
	});

	number.css({
		width: 10,
		height: 10,
		position: 'relative',
		top: 0
	});

	number.html('0');

	var dragging = false;
	var startTop = 0;
	var startY = 0;

	handle.on('mousedown', function(ev) {
		dragging = true;
		handle.css('cursor', 'default');
		startLeft = handle.css('left');
		startX = ev.clientX;
	});

	$(window).on('mousemove', function(ev) {
		if(dragging) {
			var newLeft = parseInt(startLeft) + (ev.clientX - startX);

			var min = 0;
			var max = self.width() - handle.width();

			if(newLeft < min) {
				newLeft = min;
			}
			if(newLeft > max) {
				newLeft = max;
			}

			var scaledOutput = parseInt( (newLeft / max) * 100 );
			var scaledOutputPos = newLeft;

			if( parseInt(scaledOutput / 10) > 0) {
				if(scaledOutput === 100) {
					scaledOutputPos -= 8;
				}
				else {
					scaledOutputPos -= 4;
				}
			}

			handle.css('left', newLeft);
			number.css('left', scaledOutputPos);
			number.html(scaledOutput);
		}
	});

	$(window).on('mouseup', function(ev) {
		dragging = false;
	});
}