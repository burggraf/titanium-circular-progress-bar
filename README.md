# Circular Progress Bar for Titanium
Not much to say here, except:

1. It's a circular progress bar, with the % displayed in the middle
2. It works in Titanium Classic and Titanium Alloy
3. It works in iOS and it works in Android
4. It returns a Ti.UI.View object
 	
## Circular Progress Bar Options
 
 circularProgressBar({options})
 
	percent: A value between 0 and 1
	size: The size of the circular progress bar
	margin: The margin of the circular progress bar
	backgroundColor: The backgroundColor of the circular area
	progressColor: The backgroundColor of the progress bar
	--
	topper.color: The center circle color
	topper.size: The size of the center circle
	--
	font.visible: Boolean to display the font or not
	font.color: The font color
	font.size: The fontSize
	font.shadowColor: The font shadow color
	font.shadowRadius: The font shadow radius
	font.shadowOffset.x: The x value of the shadow shadowOffset
	font.shadowOffset.y: The y value of the shadow shadowOffset

To update the progress bar, call the update method, passing it a new percent value.

## example:

	var circularProgressBar = require("circularProgressBar");
	var done = 0;
	var circleProgress = circularProgressBar({
		percent:done,
		size:50,
		margin:4,
		backgroundColor:'#fff',
		progressColor:'red',
		topper: {
			color:'#fff',
			size: 36
		},
		font: {
			visible: true,
			color: '#900',
			size: 12,
			shadowColor: '#aaa',
			shadowRadius: 1,
			shadowOffset: {
				x: 0,
				y: 1
			}
		}
	});
	var upd = function() {
		done += 0.01;
		done = parseFloat(done.toFixed(2));
		if (done > 1.00) return;
		console.log(done);
		circleProgress.update(done);
		setTimeout(upd,100);
	};
	setTimeout(upd,100);

	circleProgress.addEventListener("click",function(e){
		if (done >= 1.00) {
			done = 0.00;
			setTimeout(upd,100);         
		}
	});