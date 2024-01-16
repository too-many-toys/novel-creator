import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:get/get.dart';
import 'package:novel_creator_front/fonts.dart';

class WriteNovel extends GetView {
  WriteNovel({Key? key}) : super(key: key);

  final fontStyle = Fonts.headlineSmall;

  // FocusNode _focus = FocusNode();

  // TextEditingController _controller = TextEditingController();

  // @override
  // void initState() {
  //   // _focus.addListener(_onFocusChange);
  // }

  // @override
  // void dispose() {
  //   // _focus.removeListener(_onFocusChange);
  //   // _focus.dispose();
  // }

  // void _onFocusChange() {
  //   print("Focus: ${_focus.hasFocus.toString()}");
  // }

  final TextEditingController _titleCon = TextEditingController();
  final TextEditingController _contentCon = TextEditingController();
  // String _selectedText = '';

  @override
  Widget build(BuildContext context) {
    _titleCon.addListener(() {
      // _selectedText = _titleCon.text;
      // print(_titleCon.selection.textInside(_titleCon.text));
    });
    return SafeArea(
        child: Center(
      child: Column(
        children: [
          Row(
            children: [FloatingActionButton(onPressed: () => {})],
          ),
          const SizedBox(
            height: 20,
          ),
          Container(
            color: Colors.white,
            child: TextField(
              maxLines: null,
              controller: _titleCon,
              decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: '제목',
              ),
            ),
          ),
          Container(
            color: Colors.white,
            child: TextField(
              maxLines: null,
              controller: _contentCon,
              decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: '내용',
              ),
            ),
          ),
        ],
      ),
    ));
  }
}
