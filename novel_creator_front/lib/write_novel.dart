import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:novel_creator_front/src/rust/api/simple.dart';

class WriteNovel extends GetView {
  const WriteNovel({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: 100, height: 100, child: Text('`${greet(name: "Tom")}`'));
  }
}
