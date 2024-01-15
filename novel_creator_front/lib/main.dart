import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sidebarx/sidebarx.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const NovelCreator());
}

class NovelCreator extends StatelessWidget {
  const NovelCreator({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Novel Creator',
      darkTheme: ThemeData(
        primaryColor: Colors.black,
        primaryColorLight: Colors.black,
        brightness: Brightness.dark,
        primaryColorDark: Colors.black,
        indicatorColor: Colors.white,
        canvasColor: Colors.black,
      ),
      themeMode: ThemeMode.dark,
      home: const NovelCreatorHomePage(),
    );
  }
}

class NovelCreatorHomePage extends StatelessWidget {
  const NovelCreatorHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          SidebarX(
            theme: const SidebarXTheme(
                iconTheme: IconThemeData(color: Colors.white),
                selectedIconTheme: IconThemeData(color: Colors.red),
                selectedTextStyle: TextStyle(color: Colors.red),
                textStyle: TextStyle(color: Colors.white)),
            controller: SidebarXController(selectedIndex: 0),
            items: const [
              SidebarXItem(icon: Icons.home, label: 'Home'),
              SidebarXItem(icon: Icons.search, label: 'Search'),
            ],
          ),
          // Your app screen body
        ],
      ),
    );
  }
}
