// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import {ColorLib} from "../ColorLib.sol";

contract TestColorLib {
    function getLerp(address input) external pure returns (bytes[5] memory) {
        return ColorLib.gradientForAddress(input);
    }

    function getLerpHue(
        uint8 optionNum,
        uint256 direction,
        uint256 uhue,
        uint8 pct
    ) public pure returns (uint256) {
        return ColorLib.lerpHue(optionNum, direction, uhue, pct);
    }
}
