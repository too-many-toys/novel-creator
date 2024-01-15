import 'package:flutter/material.dart';
import 'package:get/get.dart';

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
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        useMaterial3: true,
      ),
      home: const NovelCreatorHomePage(),
    );
  }
}

class NovelCreatorHomePage extends StatelessWidget {
  const NovelCreatorHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text('Novel Creator')),
    );
  }
}
