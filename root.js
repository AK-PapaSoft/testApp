include(["ui.js"], function() {
	var wnd = new FPDrawerWindow();
	wnd.setTitle("Test Application");
	wnd.setTheme({
		primaryColor: "#cccccc",
		accentColor: "#cccccc"
	});

	var uilLoader = new FPUILoader();
	uilLoader.loadXML({
		files: ["main.xml", "drawer.xml", "view1.xml", "view2.xml", "view3.xml"],

		success: function (views) {
			// store all views
			var mainLayout = views["main.xml"],
				bgColor1 = views["view1.xml"],
				bgColor2 = views["view2.xml"],
				bgColor3 = views["view3.xml"],
				drawerView = views["drawer.xml"];

			var menuListView = drawerView.getViewByName("drawer_list_view");
			wnd.setDrawerLayout(drawerView);

			var menuDataModel = new FPDataModel();
			menuDataModel.setData(
				[{
					title: 'Home',
					icon: 'home',
					id: 0
				}, {
					title: 'Menu Item',
					icon: 'ico1',
					id: 1
				}, {
					title: 'Menu Item',
					icon: 'ico2',
					id: 2
				}, {
					title: 'Menu Item',
					icon: 'ico3',
					id: 3
				}]);
			menuListView.setDataModel(menuDataModel);

			menuListView.addEventListener({
				eventName: "onItemClick",
				callback: function(item) {
					switch (item.id) {
						// back to home
						case 0: {
							wnd.setLayout(mainLayout);
							break;
						}
						// first color menu item
						case 1: {
							wnd.setLayout(bgColor1);
							break;
						}
						// second color menu item
						case 2: {
							wnd.setLayout(bgColor2);
							break;
						}
						// third color menu item
						case 3: {
							wnd.setLayout(bgColor3);
							break;
						}
					}
				}
			});


			var button = mainLayout.getViewByName("about_button");
			button.addEventListener({
				eventName: "onClick",
				callback: function() {
					alert("Here is a link to my CV: https://goo.gl/ZTgtfI");
				}
			});

			wnd.setLayout(mainLayout);
			wnd.presentAsRootWindow();
		}
	});
});