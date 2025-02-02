{
	function EazeePalette(thisObj)
	{
		// This function adds the easing graph
		function isSecurityPrefSet()
		{
			var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
			return (securitySetting == 1);
		}
		
		if (isSecurityPrefSet() == true) {
			// TODO: Read over this and understand. Remove these comments later?
			//
			// Save the value of the current directory.
			// -- In some cases, the current directory value is lost when button and other
			// callbacks are invoked from a floating palette.
			// -- Some of the buttons in the demo palette need to read other script
			// files.  The most convenient notation for the filenames is to specify them
			// relative to the current directory. And if the current directory is set wrong,
			// then the nested scripts will fail to run correctly.
			// -- to fix this, save the current directory now, and make sure to 
			// re-establish it during onScriptButtonClick(). This will insure that the 
			// files run during onScriptButtonClick() can properly read other script files.
			//
			var myDirectory = Folder.current;
			var eazeeDirectory = new Folder(myDirectory.absoluteURI);
			
			var paletteMargins = 4;

			// Create and show a floating palette
			//
			var my_palette = new Window("palette","Eazee", undefined, {resizeable: true});
			my_palette.size = [350, 500];
			my_palette.margins = paletteMargins;
			my_palette.orientation = "column";
			
			var easeGraphGroup = my_palette.add("group", undefined, "EaseGraph");
			easeGraphGroup.orientation = "column";
			
			var easeGraph = easeGraphGroup.add("customView", [0,0,my_palette.size[0] - paletteMargins * 2, my_palette.size[0] - paletteMargins * 2]);

			// Create "Control Points" text input field below the customView
			var controlPointsGroup = my_palette.add("group", undefined, "Control Points Input");
			controlPointsGroup.orientation = "row";
			var controlPointsLabel = controlPointsGroup.add("statictext", undefined, "Control Points:");
			var controlPointsInput = controlPointsGroup.add("edittext", undefined, "0.50, 0.00, 0.50, 1.00", { multiline: false });

			easeGraph.onDraw = function() {
				var g = this.graphics;
				drawGridBackground();
				
				function drawGridBackground() {
					var easeGraphBackground = g.newBrush(g.BrushType.SOLID_COLOR,[22/255,22/255,22/255,1]);
					var easeGraphOutline = g.newPen(g.PenType.SOLID_COLOR, [80/255, 80/255, 80/255, 1], 1);
					
					// Draw the background fill
					g.newPath();
					g.rectPath(0,0, easeGraph.size[0], easeGraph.size[0]);
					g.fillPath(easeGraphBackground);
					g.strokePath(easeGraphOutline);
					g.closePath();
					
					// Draw the grid lines
					var gridCells = 4;
					// Iterate over the width and draw vertical lines
					var cellSize = easeGraph.size[0] / gridCells;
					for(var i=0; i < gridCells-1; i++) {
						var xPosition = (i+1) * cellSize;
						drawLine(g, xPosition, 0, xPosition, easeGraph.size[0], easeGraphOutline);
					}
					// Iterate over the height and draw horizontal lines
					for(var i=0; i < gridCells-1; i++) {
						var yPosition = (i+1) * cellSize;
						drawLine(g, 0, yPosition, easeGraph.size[0], yPosition, easeGraphOutline);
					}
					
					function drawLine(graphicsObject, startX, startY, endX, endY, lineStroke) {
						graphicsObject.newPath();
						graphicsObject.moveTo(startX, startY);
						graphicsObject.lineTo(endX, endY);
						graphicsObject.strokePath(lineStroke);
						graphicsObject.closePath();
					}
				}
			}
			
			// TODO: I think later we need to put the ease graph into a group/panel and set that minimum/perfered size so that if the palette is smaller we can prevent the ease graph from becoming too small!

			// Resize event handler
			my_palette.onResizing = my_palette.onResize = function () {
				var easeGraphSize =  my_palette.size[0] - paletteMargins * 2;
				easeGraph.size.width = easeGraphSize;
				easeGraph.size.height = easeGraphSize;
			};
			
			my_palette.show();
		} else {
			alert ("This script requires the scripting security preference to be set.\nGo to the \"Scripting & Expressions\" panel of your application preferences, and make sure that \"Allow Scripts to Write Files and Access Network\" is checked.", "Eazee");
		}
	}


	EazeePalette(this);
}
