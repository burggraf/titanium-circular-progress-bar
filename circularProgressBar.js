/* Circular Progress Bar Options
 
 percent: A value between 0 and 1
 size: The size of the circular progress bar
 margin: The margin of the circular progress bar
 backgroundColor: The backgroundColor of the circular area
 progressColor: The backgroundColor of the progress bar
 --
 topper.color: The center circle color
 topper.size: The size of the center circle
 ---
 font.visible: Boolean to display the font or not
 font.color: The font color
 font.size: The fontSize
 font.shadowColor: The font shadow color
 font.shadowRadius: The font shadow radius
 font.shadowOffset.x: The x value of the shadow shadowOffset
 font.shadowOffset.y: The y value of the shadow shadowOffset

example:

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
 
 */

module.exports = function circularProgressBar(options)
{
    var opts = options;
    if (opts.percent == null || opts.percent > 1 || opts.percent < 0) opts.percent = 1;
    if (opts.size == null) opts.size = 46;
    if (opts.margin == null) opts.margin = 4;
    if (opts.backgroundColor == null) opts.backgroundColor = '#fff';
    if (opts.progressColor == null) opts.progressColor = '#4ba818';
    if (opts.topper == null) opts.topper = {};
    if (opts.topper.color == null) opts.topper.color = '#fff';
    if (opts.topper.size == null) opts.topper.size = 36;
    if (opts.font == null) opts.font = {};
    if (opts.font.visible == null) opts.font.visible = true;
    if (opts.font.size == null) opts.font.size = 12;
    if (opts.font.color == null) opts.font.color = '#900';
    if (opts.font.shadowColor == null) opts.font.shadowColor = '#aaa';
    if (opts.font.shadowRadius == null) opts.font.shadowRadius = 1;
    if (opts.font.shadowOffset == null) opts.font.shadowOffset = {};
    if (opts.font.shadowOffset.x == null) opts.font.shadowOffset.x = 0;
    if (opts.font.shadowOffset.y == null) opts.font.shadowOffset.y = 1;
 
    var mainHolder = Ti.UI.createView({
        left: options.left,
        right: options.right,
        top: options.top,
        bottom: options.bottom,
        width: opts.size + opts.margin,
        height: opts.size + opts.margin,
        borderRadius: (opts.size + opts.margin) / 2 * (Titanium.Platform.displayCaps.logicalDensityFactor || 1),
        backgroundColor: opts.backgroundColor
    });
 
    var holder = Ti.UI.createView({
        width: opts.size,
        height: opts.size,
        borderRadius: opts.size / 2 * (Titanium.Platform.displayCaps.logicalDensityFactor || 1)
    });
 
 
    var layer1 = Ti.UI.createView({
        width: opts.size,
        height: opts.size,
        borderRadius: opts.size / 2 * (Titanium.Platform.displayCaps.logicalDensityFactor || 1),
        backgroundColor: opts.progressColor
    });
 
    var layer2 = Ti.UI.createView({
        left: 0,
        width: opts.size / 2,
        height: opts.size,
        backgroundColor: opts.backgroundColor
    });
 
    var layer3 = Ti.UI.createView({
        left: 0,
        width: opts.size,
        height: opts.size,
    });

    var layer3Inner = Ti.UI.createView({
        right: 0,
        width: opts.size / 2,
        height: opts.size,
        backgroundColor: opts.backgroundColor
    });
    layer3.add(layer3Inner);

    var layer4 = Ti.UI.createView({
        right: 0,
        width: opts.size / 2,
        height: opts.size,
        backgroundColor: opts.progressColor
    });
 
    var topper = Ti.UI.createView({
        width: opts.topper.size,
        height: opts.topper.size,
        borderRadius: opts.topper.size / 2 * (Titanium.Platform.displayCaps.logicalDensityFactor || 1),
        backgroundColor: opts.topper.color
    });
 
    var percentText = Ti.UI.createLabel({
        visible: opts.font.visible,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: opts.font.color,
        font: {
            fontSize:opts.font.size
        },
        shadowColor: opts.font.shadowColor,
        shadowRadius: opts.font.shadowRadius,
        shadowOffset: {
            x: opts.font.shadowOffset.x,
            y: opts.font.shadowOffset.y
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: (opts.percent * 100) + '%'
    });
 
    mainHolder.add(holder);
    topper.add(percentText);    
    holder.add(layer1);
    holder.add(layer2);
    holder.add(layer3);
    holder.add(layer4);
    holder.add(topper);
 
    var percent = opts.percent;
    var angle = 360 * percent;
    layer2.visible = (angle > 180) ? false : true;
    layer4.visible = (angle > 180) ? true : false;
    layer3.transform = Ti.UI.create2DMatrix().rotate(angle);

    mainHolder.update = function(pct) {
        console.log("update fired with " + pct);
        angle = 360 * pct;
        layer2.visible = (angle > 180) ? false : true;
        layer4.visible = (angle > 180) ? true : false;
        layer3.transform = Ti.UI.create2DMatrix().rotate(angle);    
        percentText.text = Math.round(pct * 100) + '%';
    };


    return mainHolder;  
};
