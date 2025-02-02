{
	function ToggleTestPalette(thisObj)
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
			var my_palette = new Window("palette","Toggle Test", undefined, {resizeable: true});
			my_palette.size = [300, 200];
			my_palette.margins = paletteMargins;
			my_palette.orientation = "column";

			createToggle(my_palette);
			
			function createToggle(parent) {
				var toggleWidth = 32;
				var toggleHeight = 20;
				var toggleButton = my_palette.add("customButton", [0,0,toggleWidth, toggleHeight]);
				toggleButton.state = false;

				toggleButton.onDraw = function() {
					var g = this.graphics;

					var blackBrush = g.newBrush(g.BrushType.SOLID_COLOR,[22/255,22/255,22/255,1]);
					var blueBrush = g.newBrush(g.BrushType.SOLID_COLOR,[92/255,114/255,220/255,1]);
					var lightBlueBrush = g.newBrush(g.BrushType.SOLID_COLOR,[138/255,158/255,255/255,1]);
					var greyBrush = g.newBrush(g.BrushType.SOLID_COLOR, [43/255, 43/255, 43/255, 1], 1);
					var lightGreyBrush = g.newBrush(g.BrushType.SOLID_COLOR, [217/255, 217/255, 217/255, 1], 1);

					var knobGap = 3;
					var strokeThickness = 1;

					// Draw stroke
					g.newPath();
					g.ellipsePath(0, 0, this.size.height, this.size.height);
					g.rectPath(this.size.height/2,0, this.size.width - this.size.height, this.size.height);
					g.ellipsePath(this.size.width - this.size.height, 0, this.size.height, this.size.height);
					g.fillPath(toggleButton.state ? lightBlueBrush : greyBrush);
					g.closePath();

					// Draw fill
					g.newPath();
					g.ellipsePath(strokeThickness, strokeThickness, this.size.height-(strokeThickness*2), this.size.height-(strokeThickness*2));
					g.rectPath(this.size.height/2,strokeThickness, this.size.width - this.size.height, this.size.height-(strokeThickness*2));
					g.ellipsePath(this.size.width - this.size.height + strokeThickness, strokeThickness, this.size.height - (strokeThickness*2), this.size.height - (strokeThickness*2));
					g.fillPath(toggleButton.state ? blueBrush : blackBrush);
					g.closePath();

					var falseX = knobGap;
					var trueX = (this.size.width - this.size.height/2) - (knobGap * 2 + strokeThickness);

					var knobPosition = toggleButton.state ? trueX : falseX;

					// Draw Knob
					g.newPath();
					g.ellipsePath(knobPosition, knobGap, this.size.height-(knobGap*2), this.size.height-(knobGap*2));
					g.fillPath(lightGreyBrush);
					g.closePath();
				}

				toggleButton.onClick = function() {
					toggleButton.state = !toggleButton.state;
				}
				
				return toggleButton;
			}
			
			my_palette.show();
		} else {
			alert ("This script requires the scripting security preference to be set.\nGo to the \"Scripting & Expressions\" panel of your application preferences, and make sure that \"Allow Scripts to Write Files and Access Network\" is checked.", "Eazee");
		}
	}


	ToggleTestPalette(this);
}
