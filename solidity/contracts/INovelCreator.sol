// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract INovelCreator {
  struct Novel {
    string title;
  }

  event RegisterNovel(address indexed owner, string title);
}
