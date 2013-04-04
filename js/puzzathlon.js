// global variable to store all used elements
var puzzathlon = {
}

// helper function - pad number with zeros
var pad2 = function(num){
   if (num < 10) return "0" + num;
   else return num.toString();
}
// format time to string
var showTime = function(duration){
   var ss = duration % 60;
   var mm = (duration - ss) / 60;
   return pad2(mm) + ":" + (pad2(ss).substr(0,5));
}

// initialization of layout elements
puzzathlon.init = function(parentElement, properties){
   puzzathlon.parentElement = parentElement;
   // extend properties with default values
   var prop =
   {
      init: {
         fillColor:  "lightGreen",
         fontColor:  "darkGreen",
         font:       "bold 72pt " + $('body').css('font-family'),
         text:       "Click here\nto start\nthe race"
      },
      finish: {
         fillColor:  "lightGreen",
         fontColor:  "darkRed",
         font:       "bold 56pt " + $('body').css('font-family'),
         text:       "Congratulations!\nYou finished\nthe race"
      },
      minGridSize:   500,
      maxGridSize:   800,
      statColor:{
         normal:     "black",
         current:    "red",
         complete:   "green"
      },
      raceUrl:       "php/readrace.php",
      puzzleUrl:     "php/readpuzzle.php",
      logUrl:        "php/logaction.php",
      raceId:        0
   }
   $.extend(true, prop, properties);
   puzzathlon.prop = prop;
   // create table frame and game elements
   var table = $("<table style='width: 100%'></table>");
   // header element
   puzzathlon.headerPanel = $("<div style='font-size: 16pt; text-align: center;'></div>");
   puzzathlon.header = $("<td colspan = 4 align=center></td>").append(puzzathlon.headerPanel);
   var row = $("<tr></tr>");
   puzzathlon.header.appendTo(row);
   row.appendTo(table);
   row = $("<tr></tr>");
   // race statistic panel
   puzzathlon.statsPanel = $("<div style='font-size:14pt'></div>");
   puzzathlon.leftCell = $("<td style='width: 50%' align=left valign=top></td>").append(puzzathlon.statsPanel);
   puzzathlon.leftCell.appendTo(row);
   // main grid panel
   puzzathlon.gridPanel = $("<div style='text-align:center;'></div>");
   puzzathlon.middleCell = $("<td align=center valign=top colspan=2></td>").append(puzzathlon.gridPanel);
   puzzathlon.middleCell.appendTo(row);
   // rule panel
   puzzathlon.rulePanel = $("<div style='font-size:14pt'></div>");
   puzzathlon.rightCell = $("<td style='width: 50%' align=left valign=top></td>").append(puzzathlon.rulePanel);
   puzzathlon.rightCell.appendTo(row);
   row.appendTo(table);
   row = $("<tr></tr>");
   // bottom panels to move elements when change window size
   puzzathlon.bottomleftCell = $("<td colspan=2 align=left valign=top></td>");
   puzzathlon.bottomleftCell.appendTo(row);
   puzzathlon.bottomrightCell = $("<td colspan=2 align=left valign=top></td>");
   puzzathlon.bottomrightCell.appendTo(row);
   row.appendTo(table);
   row = $("<tr></tr>");
   // footer element
   puzzathlon.footerCell = $("<td colspan = 4 align=center></td>");
   puzzathlon.footerCell.appendTo(row);
   row.appendTo(table);
   table.appendTo($(puzzathlon.parentElement));

   // canvas element (for main grid)
   var size = puzzathlon.gridSize();
   puzzathlon.puzzleGrid = $("<canvas id=puzzleGrid_ width=" + size + " height=" + size + ">");
   puzzathlon.gridPanel.append(puzzathlon.puzzleGrid);
   puzzathlon.puzzleGrid.drawRect({
         fillStyle: prop.init.fillColor,
         x: 3, y: 3,
         width: size - 6,
         height: size - 6,
         fromCenter: false
      });
   puzzathlon.puzzleGrid.drawText({
         fillStyle: prop.init.fontColor,
         font: prop.init.font,
         x: size/2, y: size/2,
         fromCenter: false,
         text: prop.init.text,
         fromCenter: true
      });
   puzzathlon.ajastFrame(puzzathlon.puzzleGrid);
   $(window).resize(function(){puzzathlon.ajastFrame(null)});
   $.getJSON(prop.raceUrl, {id: prop.raceId},
      function(data){
         puzzathlon.raceData = data;
         puzzathlon.processLogData();
         puzzathlon.headerPanel.html("<h1>" + puzzathlon.raceData.racename + "<\h1>");
         puzzathlon.showStats();
         puzzathlon.showRules(-1);
         puzzathlon.puzzleGrid.click(function(){puzzathlon.start();});
      }
   ).error(function(data) {alert("Error reading race data!"); console.log(data);});
}

puzzathlon.processLogData = function(){
   for(var i = 0; i < puzzathlon.raceData.stages.length; i++){
      if (puzzathlon.raceData.stages[i].log){
         var logs = puzzathlon.raceData.stages[i].log;
         for(var j=0; j < logs.length; j++){
            if (logs[j].action == "finish" && logs[j].data){
               $.extend(true, puzzathlon.raceData.stages[i], logs[j].data );
            }
         }
      }
   }
}

// calculate the best size for grid
puzzathlon.gridSize = function(){
   var wwidth = $(window).width();
   var wheight = $(window).height();
   if (wheight < wwidth){
      var pwidth = (wheight - 40) * 0.7;
   }else{
      var pwidth = wwidth * 0.7;
   }
   // restrict the size with given bounds
   if (pwidth < puzzathlon.prop.minGridSize) pwidth = puzzathlon.prop.minGridSize;
   if (pwidth > puzzathlon.prop.maxGridSize) pwidth = puzzathlon.prop.maxGridSize;
   return pwidth;
}

// rearrange elements when change window size
puzzathlon.ajastFrame = function(mainGrid){
   var wwidth = $(window).width();
   var wheight = $(window).height();
   // find the size of main element (puzzle grid)
   var pwidth = puzzathlon.storedGridWidth;
   if (mainGrid){
      var pwidth = mainGrid.width() + 30;
      puzzathlon.storedGridWidth = pwidth;
   }
   // three frame types - wide, narrow and medium
   var frameType = "wide";
   if (wwidth < pwidth * 1.7){
      frameType = "narrow";
   }else if (wwidth < pwidth * 2.2){
      frameType = "medium";
   }
   if (frameType == "wide"){
      // for wide type additional panels at right at left of the grid
      puzzathlon.statsPanel.appendTo(puzzathlon.leftCell);
      puzzathlon.rulePanel.appendTo(puzzathlon.rightCell);
      $(puzzathlon.leftCell).css("width","35%");
      $(puzzathlon.middleCell).css("width","30%");
      $(puzzathlon.rightCell).css("width","35%");
      $(puzzathlon.bottomleftCell).css("width","50%");
      $(puzzathlon.bottomrightCell).css("width","50%");
   }else if (frameType == "medium"){
      // for medium type one additional panels at left and other in bottom
      puzzathlon.statsPanel.appendTo(puzzathlon.leftCell);
      puzzathlon.rulePanel.appendTo(puzzathlon.bottomleftCell);
      $(puzzathlon.leftCell).css("width","50%");
      $(puzzathlon.middleCell).css("width","50%");
      $(puzzathlon.rightCell).css("width","0%");
      $(puzzathlon.bottomleftCell).css("width","100%");
      $(puzzathlon.bottomrightCell).css("width","0%");
   }else if (frameType == "narrow"){
      // for narrow type both additional panels in bottom
      puzzathlon.statsPanel.appendTo(puzzathlon.bottomleftCell);
      puzzathlon.rulePanel.appendTo(puzzathlon.bottomrightCell);
      $(puzzathlon.leftCell).css("width","1%");
      $(puzzathlon.middleCell).css("width","98%");
      $(puzzathlon.rightCell).css("width","1%");
      $(puzzathlon.bottomleftCell).css("width","50%");
      $(puzzathlon.bottomrightCell).css("width","50%");
   }
}

// function toi show statistics of race
puzzathlon.showStats = function(){
   var str ="<h2>Race schedule</h2><table style='width:100%'>";
   // loop all stages
   for(i=0; i < puzzathlon.raceData.stages.length; i++){
      var stage = puzzathlon.raceData.stages[i];
      if (stage.show){
         // choose color according to completeness of the stage
         var color = puzzathlon.prop.statColor.normal;
         if (stage.status == 1){
            color = puzzathlon.prop.statColor.current;
         }else if (stage.status == 2){
            color = puzzathlon.prop.statColor.complete;
         }
         if (stage.missCount > 1)
            str += "<tr style='color:" + color + ";'><td align = left>" + stage.name + " (" + stage.missCount + " misses)</td>";
         else if (stage.missCount == 1)
            str += "<tr style='color:" + color + ";'><td align = left>" + stage.name + " (1 miss)</td>";
         else
            str += "<tr style='color:" + color + ";'><td align = left>" + stage.name + "</td>";
         // for completed stages show time spend, for uncompleted - description
         if (stage.duration){
            str += "<td align = left>" + showTime(stage.duration) + "</td>";
         }else{
            str += "<td align = left>" + stage.desc + "</td>";
         }
         str += "</tr>"
      }
   }
   if (puzzathlon.raceData.duration){
      str += "<tr style='color:" + puzzathlon.prop.statColor.complete + ";'><td align = left>Total time</td>";
      str += "<td align = left>" + showTime(puzzathlon.raceData.duration) + "</td>";
   }
   str += "</table>";
   puzzathlon.statsPanel.html(str);
}

puzzathlon.showRules = function(stage){
   var header;
   var rules;
   if (stage==-1){
      header = puzzathlon.raceData.racename;
      rules = puzzathlon.raceData.rules;
   }else{
      header  = puzzathlon.raceData.stages[stage].type;
      rules = puzzathlon.raceData.stages[stage].rules;
   }
   var str = "<h2>" + header + "</h2>";
   if (rules){
      str += rules;
   }else{
      str += "Здесь должны быть правила проведения гонки и всякая другая чушь. Но пока Володя Португалов не написал ни правил ни всякой чуши, и поэтому здесь написан просто этот дурацкий текст." +
      " Бла-бла-бла. Надо бы объяснить что тут к чему и вообще нафига все это надо. А пока вставлена всякая фигня лишь бы занять немного места, а то выглядит все слишком пустым." +
      " А вообще обычно в таких случаях используют латынь: <BR><BR>" +
      " Lorem ipsum dolor sit amet, Nulla nec tortor. Donec id elit quis purus consectetur consequat." +
      " <BR>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci." +
      " <BR>Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat." +
      " <BR>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci. Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam." +
      " <BR>Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat. Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante." +
      " <BR>Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci. Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat.";
   }
   puzzathlon.rulePanel.html(str);
}

puzzathlon.finishStage = function(stage, next){
   var raceData = puzzathlon.raceData;
   var offset = puzzathlon.puzzleGrid.offset();
   var size = puzzathlon.gridSize();
   var oldGrid = puzzathlon.puzzleGrid;
   // move out finished canvas and start next stage
   var newTop = puzzathlon.statsPanel.offset().top + puzzathlon.statsPanel.height() + 40;
   var newLeft = puzzathlon.statsPanel.offset().left + 20;
   // one second animation
   oldGrid.css("position","absolute").offset(offset).animate(
         {width: "100px",
          height: "100px",
          top: newTop,
          left: newLeft
         },
         1000,
         function(){  // after animation show next grid
            raceData.stages[stage].finishTime = $.now();
            raceData.stages[stage].duration = (raceData.stages[stage].finishTime - raceData.stages[stage].startTime)/1000;
            if (raceData.stages[stage].missCount)
               puzzathlon.logAction(stage, "finish", '{"duration":'+raceData.stages[stage].duration+', "missCount": '+raceData.stages[stage].missCount+'}');
            else
               puzzathlon.logAction(stage, "finish", '{"duration":'+raceData.stages[stage].duration+'}');
            raceData.stages[stage].show = 1;
            raceData.stages[stage].status = 2;
            puzzathlon.showStats();
            // remove old grid after 3 seconds
            setTimeout(function(){oldGrid.remove();}, 3000);
            puzzathlon.nextStage(next);
         }
      )
   puzzathlon.puzzleGrid = $("<canvas width=" + size + " height=" + size + ">")
   puzzathlon.gridPanel.append(puzzathlon.puzzleGrid);
}

// recreate canvas
puzzathlon.showGrid = function(stage, hideCursor){
   var size = puzzathlon.gridSize();
   puzzathlon.puzzleGrid.remove();
   if (hideCursor)
      puzzathlon.puzzleGrid = $("<canvas width=" + size + " height=" + size + " style='cursor: none;'>")
   else
      puzzathlon.puzzleGrid = $("<canvas width=" + size + " height=" + size + ">")
   puzzathlon.gridPanel.append(puzzathlon.puzzleGrid);
   puzzathlon.ajastFrame(puzzathlon.puzzleGrid);
}

// logging of starting and finishing puzzle
puzzathlon.logAction = function(stage, action, actionData){
   if (puzzathlon.prop.logUrl)
      $.post(
         puzzathlon.prop.logUrl,
         {
            race:    puzzathlon.prop.raceId,
            stage:   stage,
            action:  action,
            data:    actionData
         },
         function(){}
         );
}

puzzathlon.finsihRace = function(){
   var prop = puzzathlon.prop;
   var size = puzzathlon.gridSize();
   puzzathlon.puzzleGrid.remove();
   puzzathlon.puzzleGrid = $("<canvas id=puzzleGrid_ width=" + size + " height=" + size + ">");
   puzzathlon.gridPanel.append(puzzathlon.puzzleGrid);
   puzzathlon.puzzleGrid.drawRect({
         fillStyle: prop.finish.fillColor,
         x: 3, y: 3,
         width: size - 6,
         height: size - 6,
         fromCenter: false
      });
   puzzathlon.puzzleGrid.drawText({
         fillStyle: prop.finish.fontColor,
         font: prop.finish.font,
         x: size/2, y: size/2,
         fromCenter: false,
         text: prop.finish.text,
         fromCenter: true
      });
   puzzathlon.ajastFrame(puzzathlon.puzzleGrid);
}

// start stage
puzzathlon.nextStage = function(stage){
   var raceData = puzzathlon.raceData;
   if (stage == raceData.stageCount){
      raceData.finishTime = $.now();
      raceData.duration = (raceData.finishTime - raceData.startTime)/1000;
      puzzathlon.finsihRace();
      puzzathlon.showStats();
      puzzathlon.showRules(-1);
      return;
   }
   raceData.stages[stage].startTime = $.now();
   puzzathlon.logAction(stage, "start", "");
   if (stage == 0 && !raceData.startTime) raceData.startTime = raceData.stages[stage].startTime;
   raceData.stages[stage].status = 1;
   raceData.stages[stage].show = 1;
   puzzathlon.showStats();
   puzzathlon.showRules(stage);
   if ((stage - 1)%7 == 0){
      // sudoku stage
      puzzathlon.showGrid(stage, true);
      sudokuShooting(puzzathlon.puzzleGrid,
         {
            puzzleData: puzzathlon.getPuzzle(stage),
            restoreShots: raceData.stages[stage].log,
            onShot: function(row, column, value){
               puzzathlon.logAction(stage, "shot", '{"row":' + row + ', "column": ' + column + ', "value":' + value + '}');
            },
            onComplete: function(successCount){
               if (successCount < 5){
                  raceData.stages[stage].missCount = (5 - successCount);
               }
               puzzathlon.finishStage(stage, stage + successCount + 1);
            }
         }
      );
   }else{
      // loop stage
      puzzathlon.showGrid(stage);
      loopDrawing(puzzathlon.puzzleGrid,
         {
            puzzleData: puzzathlon.getPuzzle(stage),
            onComplete: function(){
               puzzathlon.finishStage(stage, stage + 1);
            }
         }
      );

   }
}
// start solving
puzzathlon.start = function(){
   // look for current stage
   for(var i = 0; i < puzzathlon.raceData.stages.length; i++){
      var stage = puzzathlon.raceData.stages[i];
      if (stage.status == 1){
         puzzathlon.initpuzzleDate(i, true);
         return;
      }
   }
   puzzathlon.initpuzzleDate(0, true);
}

// load puzzle date and start solving
puzzathlon.initpuzzleDate = function(stage, needStart){
   $.getJSON(puzzathlon.prop.puzzleUrl, {id: puzzathlon.raceData.stages[stage].puzzleId},
      function(data){
         puzzathlon.raceData.stages[stage].puzzleData = data;
         if (needStart)
            puzzathlon.nextStage(stage);
         // load the next puzzle
         if (stage + 1 < puzzathlon.raceData.stages.length)
            setTimeout(function(){puzzathlon.initpuzzleDate( stage + 1, false);}, 1000);
      }
   ).error(function(data) {alert("Error reading puzzle data!"); console.log(data);});
}

puzzathlon.getPuzzle = function(stage){
   if (puzzathlon.raceData.stages[stage].puzzleData){
      return puzzathlon.raceData.stages[stage].puzzleData;
   }else{
      // if puzzleData is not read yet, try to read
      $.getJSON(puzzathlon.prop.puzzleUrl, {id: puzzathlon.raceData.stages[stage].puzzleId},
         function(data){
            puzzathlon.raceData.stages[stage].puzzleData = data;
         }
      ).error(function(data) {alert("Error reading puzzle data!"); console.log(data);});
      // and wait
      alert("Wait loading puzzle");
      return puzzathlon.getPuzzle(stage);
   }
}

loopDrawing = function(gridCanvas, properties){
   // default property value
   var prop =
   {
      gridlineColor:    "Green",       // color and width of common grid lines
      gridLineWidth:    2,
      borderColor:      "darkGreen",   // color and width of outlined grid lines
      borderWidth:      8,
      pathColor:        "red",         // color and line width for drawing path
      pathLineWidth:    20,

      clue: {                      // color and text properties for obstacle cells
         textFont:      "bold 56pt " + $('body').css('font-family'),
         textColor:     "darkGreen"
      },
      obstacle: {                      // color and text properties for obstacle cells
         shape:         "rect",
         fillColor:     "darkGreen"
      },
      blackcircle: {                   // color and text properties for black circles
         shape:         "circle",
         diameter:      0.7,
         fillColor:     "darkBlue"
      },
      whitecircle: {                   // color and text properties for white circles
         shape:         "circle",
         diameter:      0.65,
         strokeWidth:   8,
         strokeColor:   "darkRed"
      }
  }

   $.extend(true, prop, properties);

   gridCanvas.attr("tabindex","1");

   var load = function(gridCanvas, prop, gridData){
      // fill in grid's array
      gridData.cellData = new Array(gridData.size);
      for(var i = 0; i < gridData.size; i++) gridData.cellData[i] = new Array(gridData.size);
      // mark obstacle cells
      if (gridData.obstacles){
         for(var i = 0; i < gridData.obstacles.length; i++){
            var obstacle = gridData.obstacles[i];
            gridData.cellData[obstacle.r][obstacle.c] = {type: "obstacle"};
         }
      }
      // mark blackcircle cells
      if (gridData.blackcircles){
         for(var i = 0; i < gridData.blackcircles.length; i++){
            var circle = gridData.blackcircles[i];
            gridData.cellData[circle.r][circle.c] = {type: "blackcircle"};
         }
      }
      // mark whitecircle cells
      if (gridData.whitecircles){
         for(var i = 0; i < gridData.whitecircles.length; i++){
            var circle = gridData.whitecircles[i];
            gridData.cellData[circle.r][circle.c] = {type: "whitecircle"};
         }
      }
      // mark whitecircle cells
      if (gridData.clues){
         for(var i = 0; i < gridData.clues.length; i++){
            var clue = gridData.clues[i];
            gridData.cellData[clue.r][clue.c] = {type: "clue", value: clue.v};
         }
      }
      // save property to DOM object
      prop.width = parseInt(gridCanvas.width()) - prop.borderWidth;
      prop.height = parseInt(gridCanvas.height()) - prop.borderWidth;
      prop.cellheight = prop.height / gridData.size;
      prop.cellwidth = prop.width / gridData.size;
      prop.gridData = gridData;
      gridCanvas.loopProp = prop;
      gridCanvas.dragStartRow = -1;
      gridCanvas.dragStartColumn = -1;
      gridCanvas.draggable({
          helper: function(){return $('<div id="loopdraghelper"></div>').appendTo('body');},
          start:  function(event, ui){dragStart(gridCanvas, event.pageX - gridCanvas.offset().left, event.pageY - gridCanvas.offset().top); },
          stop:   function(event, ui){dragStop(gridCanvas, event.pageX - gridCanvas.offset().left, event.pageY - gridCanvas.offset().top);},
          drag:   function(event, ui){drag(gridCanvas, event.pageX - gridCanvas.offset().left, event.pageY - gridCanvas.offset().top);}
       });
      draw(gridCanvas);
   }

   // draw function
   var draw = function(gridCanvas){
      // get property
      var prop = gridCanvas.loopProp;
      var gridData = prop.gridData;
      var width = prop.width;
      var height = prop.height;
      var cellheight = prop.cellheight;
      var cellwidth = prop.cellwidth;
      gridCanvas.clearCanvas();
      // draw special cells
      for(var r = 0; r < gridData.size; r++){
         for(var c = 0; c < gridData.size; c++){
            if (gridData.cellData[r][c]){
               var cellType = gridData.cellData[r][c].type;
               // if shape is rect, then fill in the cell with the color
               if (prop[cellType] && prop[cellType].shape == "rect"){
                  gridCanvas.drawRect({
                     fillStyle: prop[cellType].fillColor,
                     x: prop.borderWidth/2 + c * cellwidth + prop.gridLineWidth/2,
                     y: prop.borderWidth/2 + r * cellheight + prop.gridLineWidth/2,
                     width: cellwidth - prop.gridLineWidth,
                     height: cellheight - prop.gridLineWidth,
                     fromCenter: false
                  })
               }
               // if shape is circle, then fill draw circle
               if (prop[cellType] && prop[cellType].shape == "circle"){
                  gridCanvas.drawEllipse({
                     strokeWidth: prop[cellType].strokeWidth,
                     strokeStyle: prop[cellType].strokeColor,
                     fillStyle: prop[cellType].fillColor,
                     x: prop.borderWidth/2 + c * cellwidth + prop.gridLineWidth/2 + (1 - prop[cellType].diameter) * cellwidth / 2,
                     y: prop.borderWidth/2 + r * cellheight + prop.gridLineWidth/2 + (1 - prop[cellType].diameter) * cellheight / 2,
                     width: prop[cellType].diameter * cellwidth - prop.gridLineWidth,
                     height: prop[cellType].diameter * cellheight - prop.gridLineWidth,
                     fromCenter: false
                  })
               }
               // if value is defined for cell, then digit
               var value = gridData.cellData[r][c].value;
               if (value){
                  if (!cellType) cellType = "common";
                  gridCanvas.drawText({
                     fillStyle: prop[cellType].textColor,
                     font: prop[cellType].textFont,
                     x: c * cellwidth + cellwidth/2 + prop.borderWidth/2,
                     y: r * cellheight + cellheight/2 + prop.borderWidth/2,
                     text: value
                  })
               }
            }
         }
      }
      // draw path
      for(var r = 0; r < gridData.size; r++){
         for(var c = 0; c < gridData.size; c++){
            if (gridData.cellData[r][c]){
               if (gridData.cellData[r][c].rightLine == true){
                  gridCanvas.drawRect({
                     fillStyle: prop.pathColor,
                     x: prop.borderWidth/2 + c * cellwidth + prop.gridLineWidth/2 + cellwidth/2 - prop.pathLineWidth/2,
                     y: prop.borderWidth/2 + r * cellheight + prop.gridLineWidth/2 + cellheight/2 - prop.pathLineWidth/2,
                     width: cellwidth + prop.pathLineWidth,
                     height: prop.pathLineWidth,
                     fromCenter: false
                  })
               }
               if (gridData.cellData[r][c].downLine == true){
                  gridCanvas.drawRect({
                     fillStyle: prop.pathColor,
                     x: prop.borderWidth/2 + c * cellwidth + prop.gridLineWidth/2 + cellwidth/2 - prop.pathLineWidth/2,
                     y: prop.borderWidth/2 + r * cellheight + prop.gridLineWidth/2 + cellheight/2 - prop.pathLineWidth/2,
                     width: prop.pathLineWidth,
                     height: cellheight + prop.pathLineWidth,
                     fromCenter: false
                  })
               }
            }
         }
      }
      // draw grid lines (only internal lines)
      for(var i = 1; i < gridData.size; i++){
         // horisontal line
         gridCanvas.drawLine({
            strokeStyle: prop.gridlineColor,
            strokeWidth: prop.gridLineWidth,
            x1: prop.borderWidth/2, y1: prop.borderWidth/2 + i * cellheight,
            x2: prop.borderWidth/2 + width, y2: prop.borderWidth/2 + i * cellheight
         });
         // vertical line
         gridCanvas.drawLine({
            strokeStyle: prop.gridlineColor,
            strokeWidth: prop.gridLineWidth,
            x1: prop.borderWidth/2 + i * cellwidth, y1: prop.borderWidth/2,
            x2: prop.borderWidth/2 + i * cellwidth, y2: prop.borderWidth/2 + height
         });
      }
      // draw outside borders
      gridCanvas.drawRect({
         strokeStyle: prop.borderColor,
         strokeWidth: prop.borderWidth,
         x: prop.borderWidth/2, y: prop.borderWidth/2,
         width: width,
         height: height,
         fromCenter: false
      })
   };

   checkAnswer = function(prop){
      var gridData = prop.gridData;
      var answerStr = "";
      for(var r = 0; r < gridData.size; r++){
         for(var c = 0; c < gridData.size; c++){
            if (gridData.cellData[r][c]){
               if (gridData.cellData[r][c].rightLine == true){
                  answerStr += "1";
               }else{
                  answerStr += "0";
               }
               if (gridData.cellData[r][c].downLine == true){
                  answerStr += "1";
               }else{
                  answerStr += "0";
               }
            }else{
               answerStr += "00";
            }
         }
      }
      if(hex_md5(answerStr) == gridData.answerValue){
         if (prop.onComplete){
            setTimeout(function(){prop.onComplete(), 1});
         }else{
            setTimeout(function(){alert('You finished the loop');}, 1);
         }
         return true;
      }
      return false;
   }

   var toggleLine = function(gridCanvas, startR, startC, endR, endC){
      var gridData = gridCanvas.loopProp.gridData;
      if (startC > endC){
         var swap = endC;
         endC = startC;
         startC = swap;
      }
      if (startR > endR){
         var swap = endR;
         endR = startR;
         startR = swap;
      }
      if (startC == endC){
         if (gridData.cellData[startR][startC]){
            if (gridData.cellData[startR][startC].downLine == true)
               gridData.cellData[startR][startC].downLine = false;
            else
               gridData.cellData[startR][startC].downLine = true;
         }else
            gridData.cellData[startR][startC] = {downLine: true};
      }
      if (startR == endR){
         if (gridData.cellData[startR][startC]){
            if (gridData.cellData[startR][startC].rightLine == true)
               gridData.cellData[startR][startC].rightLine = false;
            else
               gridData.cellData[startR][startC].rightLine = true;
         }else
            gridData.cellData[startR][startC] = {rightLine: true};
      }
      draw(gridCanvas);
      return checkAnswer(gridCanvas.loopProp);
   }

   //drag function
   var dragStart = function(gridCanvas, X, Y){
      // get property
      var prop = gridCanvas.loopProp;
      prop.dragStartRow = Math.floor((Y - prop.borderWidth / 2) / prop.cellheight);
      prop.dragStartColumn = Math.floor((X - prop.borderWidth / 2) / prop.cellwidth);
   }
   var dragStop = function(gridCanvas, X, Y){
      drag(gridCanvas, X, Y);
      $('#draghelper').remove();
      prop.dragStartRow = -1;
      prop.dragStartColumn = -1;
   }
   var drag = function(gridCanvas, X, Y){
      // get property
      var prop = gridCanvas.loopProp;
      var finish = false;
      if ( X >= prop.borderWidth / 2 && X <= prop.width && Y >= prop.borderWidth / 2 && Y <= prop.height){
         currentRow = Math.floor((Y - prop.borderWidth / 2) / prop.cellheight);
         currentColumn = Math.floor((X - prop.borderWidth / 2) / prop.cellwidth);
         if  (prop.dragStartRow != -1){
            if(currentRow != prop.dragStartRow || currentColumn != prop.dragStartColumn){
               finish = toggleLine(gridCanvas, prop.dragStartRow, prop.dragStartColumn, currentRow, currentColumn);
            }
         }
         prop.dragStartRow = currentRow;
         prop.dragStartColumn = currentColumn;
      }else{
         finish = true;
      }
      if (finish == true){
         prop.dragStartRow = -1;
         prop.dragStartColumn = -1;
      }
   }


   // read puzzle data
   if (prop.puzzleUrl)
      $.getJSON(prop.puzzleUrl, {"id": prop.puzzle_id}, function(data) { load(gridCanvas, prop, data);}).error(function(data) {alert("loopDrawing getJSON error!"); console.log(data);});
   else load(gridCanvas, prop, prop.puzzleData);
}

sudokuShooting = function(gridCanvas, properties){
   // default property value
   var prop =
   {
      gridlineColor:    "Green",       // color and width of common grid lines
      gridLineWidth:    2,
      borderColor:      "darkGreen",   // color and width of outlined grid lines
      borderWidth:      8,
      sightColor:       "black",       // color and line width for sight "image"
      sightLineWidth:   1,
      common: {                        // text proprties for common cells
         textColor:     "black",
         textFont:      "48pt " + $('body').css('font-family')
      },
      goal: {                          // color and text properties for goal (not yet shooted) cells
         color:         "lightGreen",
         textColor:     "black",
         textFont:      "48pt " + $('body').css('font-family')
      },
      goalsuccess: {                   // color and text properties for sucessfully shooted goal cells
         color:         "lightGreen",
         textColor:     "black",
         textFont:      "48pt " + $('body').css('font-family')
      },
      goalerror: {                     // color and text properties for unsucessfully shooted goal cells
         color:         "pink",
         textColor:     "darkRed",
         textFont:      "48pt " + $('body').css('font-family')
      },
      clue: {                          // color and text properties for clue cells
         textFont:      "bold 48pt " + $('body').css('font-family'),
         textColor:     "darkGreen"
      },
      extraShots:       true           // Is it possible to make shoot to nongoal cells?
   }

   $.extend(true, prop, properties);

   gridCanvas.attr("tabindex","1");

   var load = function(gridCanvas, prop, gridData){
      // fill in grd's array
      gridData.cellData = new Array(gridData.size);
      for(var i = 0; i < gridData.size; i++) gridData.cellData[i] = new Array(gridData.size);
      // mark goal cells
      var goalCount = 0;
      for(var i = 0; i < gridData.goals.length; i++){
         var goal = gridData.goals[i];
         goalCount++;
         gridData.cellData[goal.r][goal.c] = {type: "goal", goalValue: goal.v};
      }
      // mark clue's cells
      for(var i = 0; i < gridData.clues.length; i++){
         var clue = gridData.clues[i];
         gridData.cellData[clue.r][clue.c] = {type: "clue", value: clue.v};
      }
      // save property to DOM object
      prop.gridData = gridData;
      prop.sightX = null;
      prop.sightY = null;
      prop.sightRow = null;
      prop.sightColumn = null;
      prop.goalCount = goalCount;
      prop.shotCount = 0;
      prop.successCount = 0;
      gridCanvas.sudokuProp = prop;
      draw(gridCanvas);
      gridCanvas.mousemove(function(event){
         draw(gridCanvas, event.pageX - gridCanvas.offset().left, event.pageY - gridCanvas.offset().top);
      });

      gridCanvas.mouseout(function(event){
         draw(gridCanvas);
      });

      gridCanvas.keydown(function(event){
         shoot(gridCanvas, event.which);
      });
      if (prop.restoreShots){
         for(var i = 0; i < prop.restoreShots.length; i++){
            if (prop.restoreShots[i].action == "shot"){
               var shot = prop.restoreShots[i].data;
               registerShot(prop, shot.row, shot.column, shot.value);
            }
         }

      }
   }

   // draw function
   var draw = function(gridCanvas, sightX, sightY){
      // get property
      var prop = gridCanvas.sudokuProp;
      var gridData = prop.gridData;
      var width = parseInt(gridCanvas.width()) - prop.borderWidth;
      var height = parseInt(gridCanvas.height()) - prop.borderWidth;
      var cellheight = height / gridData.size;
      var cellwidth = width / gridData.size;
      gridCanvas.clearCanvas();
      // draw special cells
      for(var r = 0; r < gridData.size; r++){
         for(var c = 0; c < gridData.size; c++){
            if (gridData.cellData[r][c]){
               var cellType = gridData.cellData[r][c].type;
               // if color is defined for type, then fill in the cell with the color
               if (prop[cellType] && prop[cellType].color){
                  gridCanvas.drawRect({
                     fillStyle: prop[cellType].color,
                     x: prop.borderWidth/2 + c * cellwidth + prop.gridLineWidth/2,
                     y: prop.borderWidth/2 + r * cellheight + prop.gridLineWidth/2,
                     width: cellwidth - prop.gridLineWidth,
                     height: cellheight - prop.gridLineWidth,
                     fromCenter: false
                  })
               }
               // if value is defined for cell, then digit
               var value = gridData.cellData[r][c].value;
               if (value){
                  if (!cellType) cellType = "common";
                  gridCanvas.drawText({
                     fillStyle: prop[cellType].textColor,
                     font: prop[cellType].textFont,
                     x: c * cellwidth + cellwidth/2 + prop.borderWidth/2,
                     y: r * cellheight + cellheight/2 + prop.borderWidth/2,
                     text: value
                  })
               }
            }
         }
      }
      // draw grid lines (only internal lines)
      for(var i = 1; i < gridData.size; i++){
         // horisontal line
         gridCanvas.drawLine({
            strokeStyle: prop.gridlineColor,
            strokeWidth: prop.gridLineWidth,
            x1: prop.borderWidth/2, y1: prop.borderWidth/2 + i * cellheight,
            x2: prop.borderWidth/2 + width, y2: prop.borderWidth/2 + i * cellheight
         });
         // vertical line
         gridCanvas.drawLine({
            strokeStyle: prop.gridlineColor,
            strokeWidth: prop.gridLineWidth,
            x1: prop.borderWidth/2 + i * cellwidth, y1: prop.borderWidth/2,
            x2: prop.borderWidth/2 + i * cellwidth, y2: prop.borderWidth/2 + height
         });
      }
      // draw outside borders
      gridCanvas.drawRect({
         strokeStyle: prop.borderColor,
         strokeWidth: prop.borderWidth,
         x: prop.borderWidth/2, y: prop.borderWidth/2,
         width: width,
         height: height,
         fromCenter: false
      })
      // draw borders of area (for each cell sompare area with areas below and at the right)
      for(var i = 0; i < gridData.size; i++){
         for(var j = 0; j < gridData.size; j++){
            var thisArea = gridData.rows[i].cells[j];
            if (i < gridData.size - 1){
               // check square below
               var downArea = gridData.rows[i + 1].cells[j];
               if (downArea != thisArea){
                  gridCanvas.drawLine({
                     strokeStyle: prop.borderColor,
                     strokeWidth: prop.borderWidth,
                     x1: j * cellwidth, y1: prop.borderWidth/2 + (i + 1) * cellheight,
                     x2: prop.borderWidth + (j + 1) * cellwidth, y2: prop.borderWidth/2 + (i + 1) * cellheight
                  });

               }
            }
            if (j < gridData.size - 1){
               // check square at right
               var rightArea = gridData.rows[i].cells[j + 1];
               if (rightArea != thisArea){
                  gridCanvas.drawLine({
                     strokeStyle: prop.borderColor,
                     strokeWidth: prop.borderWidth,
                     x1: prop.borderWidth/2 + (j + 1) * cellwidth, y1: i * cellheight,
                     x2: prop.borderWidth/2 + (j + 1) * cellwidth, y2: prop.borderWidth + (i + 1) * cellheight
                  });

               }
            }
         }
      }
      if (sightX) {
         if(sightX >= 0){
            prop.sightX = sightX;
            prop.sightY = sightY;
            prop.sightRow = Math.floor((sightY - prop.borderWidth / 2) / cellheight);
            prop.sightColumn = Math.floor((sightX - prop.borderWidth / 2) / cellwidth);
         } else {
            sightX = prop.sightX;
            sightY = prop.sightY;
         }
         // draw sight if coordinates are given
         for(var i = 0; i < 5; i++){
            // four circles
            gridCanvas.drawEllipse({
               strokeStyle: prop.sightColor,
               strokeWidth: prop.sightLineWidth,
               x: sightX - cellwidth * i / 10, y: sightY - cellheight * i / 10,
               width: cellwidth * i / 5,
               height: cellheight * i / 5,
               fromCenter: false
            });
         }
         // two lines
         gridCanvas.drawLine({
            strokeStyle: prop.sightColor,
            strokeWidth: prop.sightLineWidth,
            x1: sightX - cellwidth / 2, y1: sightY,
            x2: sightX + cellwidth / 2, y2: sightY
         });
         gridCanvas.drawLine({
            strokeStyle: prop.sightColor,
            strokeWidth: prop.sightLineWidth,
            x1: sightX, y1: sightY  - cellheight / 2,
            x2: sightX, y2: sightY + cellheight / 2
         });
         gridCanvas.focus();
      }else{
         gridCanvas.blur();
         prop.sightRow = null;
         prop.sightColumn = null;
      }
   };

   var redraw = function(gridCanvas){
      draw(gridCanvas, -1);
   }

   var checkShotValue = function(row, column, value, goalValue){
      return hex_md5(row+"_"+column+"_"+value) == goalValue;
   }

   var registerShot = function(prop, row, column, value){
      var currentData = prop.gridData.cellData[row][column];
      prop.shotCount++;
      currentData.value = value;
      if (checkShotValue(row, column, value, currentData.goalValue)){
         prop.successCount++;
         currentData.type = "goalsuccess";
      }else{
         currentData.type = "goalerror";
      }
      if (prop.shotCount == prop.goalCount){
         if (prop.onComplete){
            prop.onComplete(prop.successCount);
         }else{
            setTimeout(function(){alert('You made ' + prop.shotCount + ' shots and closed ' + prop.successCount + ' goals');}, 1);
         }
      }
   }
   var shoot = function(gridCanvas, keyCode){
      var prop = gridCanvas.sudokuProp;
      var value = null;
      if (keyCode >= 48 && keyCode <= 57) value = keyCode - 48;
      if (keyCode >= 96 && keyCode <= 105) value = keyCode - 96;
      if (keyCode == 45) value = 0;
      if (keyCode == 35) value = 1;
      if (keyCode == 40) value = 2;
      if (keyCode == 34) value = 3;
      if (keyCode == 37) value = 4;
      if (keyCode == 12) value = 5;
      if (keyCode == 39) value = 6;
      if (keyCode == 36) value = 7;
      if (keyCode == 38) value = 8;
      if (keyCode == 33) value = 9;
      if (prop.sightRow == null)
         return;
      if (value != null){
         var currentData = prop.gridData.cellData[prop.sightRow][prop.sightColumn];
         if (!currentData){
            if (prop.extraShots){
               newData = {value: value, type: "common"};
               prop.gridData.cellData[prop.sightRow][prop.sightColumn] = newData;
            }
         }else{
            if(currentData.type == "common"){
               if (prop.extraShots)
                  currentData.value = value;
            }else if (currentData.type == "goal" || currentData.type == "goalerror"){
               if(prop.onShot) prop.onShot(prop.sightRow, prop.sightColumn, value);
               registerShot(prop, prop.sightRow, prop.sightColumn, value);
            }
         }
      }
      redraw(gridCanvas);
   }

   // read puzzle data
   if (prop.puzzleUrl)
      $.getJSON(prop.puzzleUrl, {"id": prop.puzzle_id}, function(data) { load(gridCanvas, prop, data);}).error(function(data) {alert("sudokuShooting getJSON error!"); console.log(data);});
   else load(gridCanvas, prop, prop.puzzleData);
}
