import 'package:flutter/material.dart';

class Fonts {
  static TextTheme get textTheme => const TextTheme(
        headlineSmall: TextStyle(
          color: Colors.white,
          fontSize: 46,
          fontWeight: FontWeight.w800,
        ),
      );

  static TextStyle get headlineSmall => const TextStyle(
        fontFamily: 'appFont',
        color: Colors.white,
        fontSize: 46,
        fontWeight: FontWeight.w800,
      );
}
