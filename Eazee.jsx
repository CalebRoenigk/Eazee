{
	function EazeePalette(thisObj)
	{
		// This function adds the easing graph
		function addEasingGraph(palette, currentDirectory)
		{
			var easeGraph = my_palette.add("customButton",[0,0,120,35]);
			// Graph Drawing
			easeGraph.text = "My Fancy Button";

			easeGraph.onDraw = function() {
				var g = this.graphics;
				var blueBrush = g.newBrush(g.BrushType.SOLID_COLOR,[0/255,152/255,255/255,1]);
				var blackPen = g.newPen(g.PenType.SOLID_COLOR,[0/255,0/255,0/255,1],1);
				var textSize = g.measureString(button.text);
				drawRoundedRect(g,blueBrush,this.size.width,this.size.height,15,0,0);
				g.drawString(easeGraph.text,blackPen,(this.size.width-textSize.width)/2,(this.size.height-textSize.height)/2);
			}
			//
			// var newButton = palette.add("button", buttonRect, buttonLabel);
			//
			// // JavaScript has an unusual but useful bit of functionality.
			// // You can just assign a value to a new variable name and JS will
			// // store it for you. The lines below create new variables named
			// // scriptName and currentDirectory within newButton, and sets them
			// // to buttonScriptName and myCurrentDirectory.
			// // Later, in the onButtonClick() callback, the button will first
			// // re-establish the current directory, then load and
			// // run that file.
			// newButton.scriptFileName   = buttonScriptName;
			// newButton.currentDirectory = buttonCurrentDirectory;
			//
			// newButton.onClick = onScriptButtonClick;
			return easeGraph;
		}
		
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

			// Horizontal Spacing variables
			var left_margin_width    = 5;
			var right_margin_width   = 5;
			var between_button_width = 5;

			// Width of buttons depends on platform and language
			var button_width;
			if (system.osName.indexOf("Windows") != -1) {
				// Windows system has narrower buttons.
				button_width = 120;
			} else {
				// Mac has wider buttons
				button_width = 160;
			}
			if (app.language == Language.JAPANESE) {
				// Add 20 pixels for japanese machines, default font is wider
				button_width += 17;
			}

			var l_button_left  = left_margin_width;
			var l_button_right = l_button_left + button_width;
			var r_button_left  = l_button_right + between_button_width;
			var r_button_right = r_button_left + button_width;
			var palette_width  = r_button_right + right_margin_width;

			// Create and show a floating palette
			//
			var my_palette = new Window("palette","Eazee");
			my_palette.bounds = [300,200,300+palette_width,285];
			var easeGraph = addEasingGraph(my_palette, eazeeDirectory);
			
			my_palette.show();
		} else {
			alert ("This script requires the scripting security preference to be set.\nGo to the \"Scripting & Expressions\" panel of your application preferences, and make sure that \"Allow Scripts to Write Files and Access Network\" is checked.", "Eazee");
		}
	}


	EazeePalette(this);
}
