// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

import './INovelCreator.sol';

contract NovelCreator is Initializable, AccessControlUpgradeable, UUPSUpgradeable, INovelCreator {
  Novel[] public novels;
  mapping(address => Novel[]) public novelOwners;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address defaultAdmin) public initializer {
    __AccessControl_init();
    __UUPSUpgradeable_init();

    _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
  }

  function registerNovel(string calldata title) public {
    novels.push(Novel(title));
    novelOwners[_msgSender()].push(Novel(title));

    emit RegisterNovel(_msgSender(), title);
  }

  function _authorizeUpgrade(
    address newImplementation
  ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
