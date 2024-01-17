import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:novel_creator_front/fonts.dart';

class WriteNovel extends GetView<WriteNovelController> {
  WriteNovel({Key? key}) : super(key: key);

  final fontStyle = Fonts.headlineSmall;

  @override
  Widget build(BuildContext context) {
    controller.titleCon.value.addListener(() {
      controller.titleText = controller.titleCon.value.text.obs;
      // print(_titleCon.selection.textInside(_titleCon.text));
    });
    controller.contentCon.value.addListener(() {
      controller.contentText = controller.contentCon.value.text.obs;
      // print(_contentCon.selection.textInside(_contentCon.text));
    });

    return Column(
      children: [
        const SizedBox(
          height: 20,
        ),
        Row(
          children: [
            FloatingActionButton(onPressed: () => {}),
            FloatingActionButton(onPressed: () => {})
          ],
        ),
        const SizedBox(
          height: 20,
        ),
        Expanded(
          child: Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                  child: Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    color: Colors.white,
                    child: TextField(
                        maxLines: 1,
                        controller: controller.titleCon.value,
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          hintText: '제목',
                        )),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  Expanded(
                      child: Container(
                    color: Colors.white,
                    child: TextField(
                        maxLines: null,
                        controller: controller.contentCon.value,
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          hintText: '내용',
                        )),
                  )),
                  const SizedBox(
                    height: 5,
                  ),
                ],
              )),
              const SizedBox(
                width: 20,
              ),
              Expanded(
                  child: Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                      color: Colors.white,
                      child: Text(
                        controller.titleText.value,
                      )),
                  Expanded(
                      child: Container(
                          color: Colors.white,
                          child: Text(controller.contentText.value,
                              style: const TextStyle(
                                  fontSize: 20, color: Colors.black))))
                ],
              )),
            ],
          ),
        )
      ],
    );
  }
}

class WriteNovelController extends GetxController {
  RxString titleText = ''.obs;
  RxString contentText = ''.obs;

  Rx<TextEditingController> titleCon = TextEditingController().obs;
  Rx<TextEditingController> contentCon = TextEditingController().obs;
}
