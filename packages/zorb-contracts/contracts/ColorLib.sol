// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

library ColorLib {
    struct HSL {
        uint256 h;
        uint256 s;
        uint256 l;
    }

    function cubicInOut(uint16 p) internal pure returns (int256) {
        if (p < 13) {
            return 0;
        }
        if (p < 17) {
            return 1;
        }
        if (p < 19) {
            return 2;
        }
        if (p < 21) {
            return 3;
        }
        if (p < 23) {
            return 4;
        }
        if (p < 24) {
            return 5;
        }
        if (p < 25) {
            return 6;
        }
        if (p < 27) {
            return 7;
        }
        if (p < 28) {
            return 8;
        }
        if (p < 29) {
            return 9;
        }
        if (p < 30) {
            return 10;
        }
        if (p < 31) {
            return 11;
        }
        if (p < 32) {
            return 13;
        }
        if (p < 33) {
            return 14;
        }
        if (p < 34) {
            return 15;
        }
        if (p < 35) {
            return 17;
        }
        if (p < 36) {
            return 18;
        }
        if (p < 37) {
            return 20;
        }
        if (p < 38) {
            return 21;
        }
        if (p < 39) {
            return 23;
        }
        if (p < 40) {
            return 25;
        }
        if (p < 41) {
            return 27;
        }
        if (p < 42) {
            return 29;
        }
        if (p < 43) {
            return 31;
        }
        if (p < 44) {
            return 34;
        }
        if (p < 45) {
            return 36;
        }
        if (p < 46) {
            return 38;
        }
        if (p < 47) {
            return 41;
        }
        if (p < 48) {
            return 44;
        }
        if (p < 49) {
            return 47;
        }
        if (p < 50) {
            return 50;
        }
        if (p < 51) {
            return 52;
        }
        if (p < 52) {
            return 55;
        }
        if (p < 53) {
            return 58;
        }
        if (p < 54) {
            return 61;
        }
        if (p < 55) {
            return 63;
        }
        if (p < 56) {
            return 65;
        }
        if (p < 57) {
            return 68;
        }
        if (p < 58) {
            return 70;
        }
        if (p < 59) {
            return 72;
        }
        if (p < 60) {
            return 74;
        }
        if (p < 61) {
            return 76;
        }
        if (p < 62) {
            return 78;
        }
        if (p < 63) {
            return 79;
        }
        if (p < 64) {
            return 81;
        }
        if (p < 65) {
            return 82;
        }
        if (p < 66) {
            return 84;
        }
        if (p < 67) {
            return 85;
        }
        if (p < 68) {
            return 86;
        }
        if (p < 69) {
            return 88;
        }
        if (p < 70) {
            return 89;
        }
        if (p < 71) {
            return 90;
        }
        if (p < 72) {
            return 91;
        }
        if (p < 74) {
            return 92;
        }
        if (p < 75) {
            return 93;
        }
        if (p < 76) {
            return 94;
        }
        if (p < 78) {
            return 95;
        }
        if (p < 80) {
            return 96;
        }
        if (p < 82) {
            return 97;
        }
        if (p < 86) {
            return 98;
        }
        return 99;
    }

    function cubicIn(uint256 p) internal pure returns (uint8) {
        if (p < 22) {
            return 0;
        }
        if (p < 28) {
            return 1;
        }
        if (p < 32) {
            return 2;
        }
        if (p < 32) {
            return 3;
        }
        if (p < 34) {
            return 3;
        }
        if (p < 36) {
            return 4;
        }
        if (p < 39) {
            return 5;
        }
        if (p < 41) {
            return 6;
        }
        if (p < 43) {
            return 7;
        }
        if (p < 46) {
            return 9;
        }
        if (p < 47) {
            return 10;
        }
        if (p < 49) {
            return 11;
        }
        if (p < 50) {
            return 12;
        }
        if (p < 51) {
            return 13;
        }
        if (p < 53) {
            return 14;
        }
        if (p < 54) {
            return 15;
        }
        if (p < 55) {
            return 16;
        }
        if (p < 56) {
            return 17;
        }
        if (p < 57) {
            return 18;
        }
        if (p < 58) {
            return 19;
        }
        if (p < 59) {
            return 20;
        }
        if (p < 60) {
            return 21;
        }
        if (p < 61) {
            return 22;
        }
        if (p < 62) {
            return 23;
        }
        if (p < 63) {
            return 25;
        }
        if (p < 64) {
            return 26;
        }
        if (p < 65) {
            return 27;
        }
        if (p < 66) {
            return 28;
        }
        if (p < 67) {
            return 30;
        }
        if (p < 68) {
            return 31;
        }
        if (p < 69) {
            return 32;
        }
        if (p < 70) {
            return 34;
        }
        if (p < 71) {
            return 35;
        }
        if (p < 72) {
            return 37;
        }
        if (p < 73) {
            return 38;
        }
        if (p < 74) {
            return 40;
        }
        if (p < 75) {
            return 42;
        }
        if (p < 76) {
            return 43;
        }
        if (p < 77) {
            return 45;
        }
        if (p < 78) {
            return 47;
        }
        if (p < 79) {
            return 49;
        }
        if (p < 80) {
            return 51;
        }
        if (p < 81) {
            return 53;
        }
        if (p < 82) {
            return 55;
        }
        if (p < 83) {
            return 57;
        }
        if (p < 84) {
            return 59;
        }
        if (p < 85) {
            return 61;
        }
        if (p < 86) {
            return 63;
        }
        if (p < 87) {
            return 65;
        }
        if (p < 88) {
            return 68;
        }
        if (p < 89) {
            return 70;
        }
        if (p < 90) {
            return 72;
        }
        if (p < 91) {
            return 75;
        }
        if (p < 92) {
            return 77;
        }
        if (p < 93) {
            return 80;
        }
        if (p < 94) {
            return 83;
        }
        if (p < 95) {
            return 85;
        }
        if (p < 96) {
            return 88;
        }
        if (p < 97) {
            return 91;
        }
        if (p < 98) {
            return 94;
        }
        return 97;
    }

    function quintIn(uint256 p) internal pure returns (uint8) {
        if (p < 39) {
            return 0;
        }
        if (p < 45) {
            return 1;
        }
        if (p < 49) {
            return 2;
        }
        if (p < 52) {
            return 3;
        }
        if (p < 53) {
            return 4;
        }
        if (p < 54) {
            return 4;
        }
        if (p < 55) {
            return 5;
        }
        if (p < 56) {
            return 5;
        }
        if (p < 57) {
            return 6;
        }
        if (p < 58) {
            return 6;
        }
        if (p < 59) {
            return 7;
        }
        if (p < 60) {
            return 7;
        }
        if (p < 61) {
            return 8;
        }
        if (p < 62) {
            return 9;
        }
        if (p < 63) {
            return 9;
        }
        if (p < 64) {
            return 10;
        }
        if (p < 65) {
            return 11;
        }
        if (p < 66) {
            return 12;
        }
        if (p < 67) {
            return 13;
        }
        if (p < 68) {
            return 14;
        }
        if (p < 69) {
            return 15;
        }
        if (p < 70) {
            return 16;
        }
        if (p < 71) {
            return 18;
        }
        if (p < 72) {
            return 19;
        }
        if (p < 73) {
            return 20;
        }
        if (p < 74) {
            return 22;
        }
        if (p < 75) {
            return 23;
        }
        if (p < 76) {
            return 25;
        }
        if (p < 77) {
            return 27;
        }
        if (p < 78) {
            return 28;
        }
        if (p < 79) {
            return 30;
        }
        if (p < 80) {
            return 32;
        }
        if (p < 81) {
            return 34;
        }
        if (p < 82) {
            return 37;
        }
        if (p < 83) {
            return 39;
        }
        if (p < 84) {
            return 41;
        }
        if (p < 85) {
            return 44;
        }
        if (p < 86) {
            return 47;
        }
        if (p < 87) {
            return 49;
        }
        if (p < 88) {
            return 52;
        }
        if (p < 89) {
            return 55;
        }
        if (p < 90) {
            return 59;
        }
        if (p < 91) {
            return 62;
        }
        if (p < 92) {
            return 65;
        }
        if (p < 93) {
            return 69;
        }
        if (p < 94) {
            return 73;
        }
        if (p < 95) {
            return 77;
        }
        if (p < 96) {
            return 81;
        }
        if (p < 97) {
            return 85;
        }
        if (p < 98) {
            return 90;
        }
        return 95;
    }

    // Util for keeping hue range in 0-360 positive
    function clampHue(int256 h) internal pure returns (uint256) {
        unchecked {
            h /= 100;
            if (h >= 0) {
                return uint256(h) % 360;
            } else {
                return (uint256(-1 * h) % 360);
            }
        }
    }

    function lerpHue(
        uint8 optionNum,
        uint256 direction,
        uint256 uhue,
        uint8 pct
    ) internal pure returns (uint256) {
        // unchecked {
        uint256 option = optionNum % 4;
        int256 hue = int256(uhue);

        if (option == 0) {
            return
                clampHue(
                    (((100 - int256(uint256(pct))) * hue) +
                        (int256(uint256(pct)) *
                            (direction == 0 ? hue - 10 : hue + 10)))
                );
        }
        if (option == 1) {
            return
                clampHue(
                    (((100 - int256(uint256(pct))) * hue) +
                        (int256(uint256(pct)) *
                            (direction == 0 ? hue - 30 : hue + 30)))
                );
        }
        if (option == 2) {
            return
                clampHue(
                    (
                        (((100 - cubicInOut(pct)) * hue) +
                            (cubicInOut(pct) *
                                (direction == 0 ? hue - 50 : hue + 50)))
                    )
                );
        }

        return
            clampHue(
                ((100 - cubicInOut(pct)) * hue) +
                    (cubicInOut(pct) *
                        int256(
                            hue +
                                ((direction == 0 ? int256(-60) : int256(60)) *
                                    int256(uint256(optionNum > 128 ? 1 : 0))) +
                                30
                        ))
            );
        // }
    }

    // i know :( hardcoded tables are fastest for solidity though
    function inSine2(uint256 pct) internal pure returns (uint16) {
        if (pct == 1) {
            return 3;
        }
        if (pct == 2) {
            return 6;
        }
        if (pct == 3) {
            return 9;
        }
        if (pct == 4) {
            return 12;
        }
        if (pct == 5) {
            return 15;
        }
        if (pct == 6) {
            return 18;
        }
        if (pct == 7) {
            return 21;
        }
        if (pct == 8) {
            return 24;
        }
        if (pct == 9) {
            return 27;
        }
        if (pct == 10) {
            return 30;
        }
        if (pct == 11) {
            return 33;
        }
        if (pct == 12) {
            return 36;
        }
        if (pct == 13) {
            return 39;
        }
        if (pct == 14) {
            return 42;
        }
        if (pct == 15) {
            return 45;
        }
        if (pct == 16) {
            return 48;
        }
        if (pct == 17) {
            return 50;
        }
        if (pct == 18) {
            return 53;
        }
        if (pct == 19) {
            return 56;
        }
        if (pct == 20) {
            return 58;
        }
        if (pct == 21) {
            return 61;
        }
        if (pct == 22) {
            return 63;
        }
        if (pct == 23) {
            return 66;
        }
        if (pct == 24) {
            return 68;
        }
        if (pct == 25) {
            return 70;
        }
        if (pct == 26) {
            return 72;
        }
        if (pct == 27) {
            return 75;
        }
        if (pct == 28) {
            return 77;
        }
        if (pct == 29) {
            return 79;
        }
        if (pct == 30) {
            return 80;
        }
        if (pct == 31) {
            return 82;
        }
        if (pct == 32) {
            return 84;
        }
        if (pct == 33) {
            return 86;
        }
        if (pct == 34) {
            return 87;
        }
        if (pct == 35) {
            return 89;
        }
        if (pct == 36) {
            return 90;
        }
        if (pct == 37) {
            return 91;
        }
        if (pct == 38) {
            return 92;
        }
        if (pct == 39) {
            return 94;
        }
        if (pct == 40) {
            return 95;
        }
        if (pct == 41) {
            return 96;
        }
        if (pct == 42) {
            return 96;
        }
        if (pct == 43) {
            return 97;
        }
        if (pct == 44) {
            return 98;
        }
        if (pct == 45) {
            return 98;
        }
        if (pct == 46) {
            return 99;
        }
        if (pct == 47) {
            return 99;
        }
        if (pct == 48) {
            return 99;
        }
        if (pct == 49) {
            return 99;
        }
        if (pct == 50) {
            return 100;
        }
        if (pct == 51) {
            return 99;
        }
        if (pct == 52) {
            return 99;
        }
        if (pct == 53) {
            return 99;
        }
        if (pct == 54) {
            return 99;
        }
        if (pct == 55) {
            return 98;
        }
        if (pct == 56) {
            return 98;
        }
        if (pct == 57) {
            return 97;
        }
        if (pct == 58) {
            return 96;
        }
        if (pct == 59) {
            return 96;
        }
        if (pct == 60) {
            return 95;
        }
        if (pct == 61) {
            return 94;
        }
        if (pct == 62) {
            return 92;
        }
        if (pct == 63) {
            return 91;
        }
        if (pct == 64) {
            return 90;
        }
        if (pct == 65) {
            return 89;
        }
        if (pct == 66) {
            return 87;
        }
        if (pct == 67) {
            return 86;
        }
        if (pct == 68) {
            return 84;
        }
        if (pct == 69) {
            return 82;
        }
        if (pct == 70) {
            return 80;
        }
        if (pct == 71) {
            return 79;
        }
        if (pct == 72) {
            return 77;
        }
        if (pct == 73) {
            return 75;
        }
        if (pct == 74) {
            return 72;
        }
        if (pct == 75) {
            return 70;
        }
        if (pct == 76) {
            return 68;
        }
        if (pct == 77) {
            return 66;
        }
        if (pct == 78) {
            return 63;
        }
        if (pct == 79) {
            return 61;
        }
        if (pct == 80) {
            return 58;
        }
        if (pct == 81) {
            return 56;
        }
        if (pct == 82) {
            return 53;
        }
        if (pct == 83) {
            return 50;
        }
        if (pct == 84) {
            return 48;
        }
        if (pct == 85) {
            return 45;
        }
        if (pct == 86) {
            return 42;
        }
        if (pct == 87) {
            return 39;
        }
        if (pct == 88) {
            return 36;
        }
        if (pct == 89) {
            return 33;
        }
        if (pct == 90) {
            return 30;
        }
        if (pct == 91) {
            return 27;
        }
        if (pct == 92) {
            return 24;
        }
        if (pct == 93) {
            return 21;
        }
        if (pct == 94) {
            return 18;
        }
        if (pct == 95) {
            return 15;
        }
        if (pct == 96) {
            return 12;
        }
        if (pct == 97) {
            return 9;
        }
        if (pct == 98) {
            return 6;
        }
        if (pct == 99) {
            return 3;
        }
        return 0;
    }

    function lerpLightness(
        uint8 optionNum,
        uint256 start,
        uint256 end,
        uint256 pct
    ) internal pure returns (uint256) {
        uint256 lerpPercent;
        if (optionNum == 0) {
            lerpPercent = quintIn(pct);
        } else {
            lerpPercent = cubicIn(pct);
        }
        return
            1 + (((100.0 - lerpPercent) * start + (lerpPercent * end)) / 100);
    }

    function lerpSaturation(
        uint8 optionNum,
        uint256 start,
        uint256 end,
        uint256 pct
    ) internal pure returns (uint256) {
        unchecked {
            uint256 lerpPercent;
            if (optionNum == 0) {
                lerpPercent = quintIn(pct);
                return
                    1 +
                    (((100.0 - lerpPercent) * start + lerpPercent * end) / 100);
            }
            lerpPercent = inSine2(pct);
            return ((100.0 - lerpPercent) * start + lerpPercent * end) / 100;
        }
    }

    function encodeStr(
        uint256 h,
        uint256 s,
        uint256 l
    ) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                "hsl(",
                StringsUpgradeable.toString(h),
                ", ",
                StringsUpgradeable.toString(s),
                "%, ",
                StringsUpgradeable.toString(l),
                "%)"
            );
    }

    function gradientForAddress(address addr)
        internal
        pure
        returns (bytes[5] memory)
    {
        unchecked {
            bytes32 addrBytes = bytes32(uint256(uint160(addr)));
            uint256 startHue = (uint256(uint8(addrBytes[31 - 12])) * 24) / 17; // 255 - 360
            uint256 startLightness = (uint256(uint8(addrBytes[31 - 2])) * 5) /
                32 +
                30; // 255 => 40 + 30 (30, 70)
            uint256 endLightness = startLightness + 20;
            if (endLightness < 98) {
                endLightness = 98;
            }
            endLightness += (((uint256(uint8(addrBytes[31 - 8])) * 13) / 128) +
                72); // 72-98
            endLightness /= 2;

            uint256 startSaturation = (uint256(uint8(addrBytes[31 - 7])) * 7) /
                128 +
                72; // 0-14 + 72

            uint256 endSaturation = uint256(uint8(addrBytes[31 - 10])) / 8 + 60; // 0-32 + 60
            if (endSaturation < 90) {
                endSaturation = 90;
            }
            if (endSaturation < startSaturation + 30) {
                endSaturation = startSaturation + 30;
            }
            startSaturation = startSaturation / 2 + startLightness / 2;
            endSaturation = endSaturation / 2 + endLightness / 2;

            return [
                // 0
                encodeStr(
                    lerpHue(
                        uint8(addrBytes[31 - 3]),
                        uint8(addrBytes[31 - 6]) % 2,
                        startHue,
                        0
                    ),
                    lerpSaturation(
                        uint8(addrBytes[31 - 3]) % 2,
                        startSaturation,
                        endSaturation,
                        100
                    ),
                    lerpLightness(
                        uint8(addrBytes[31 - 5]) % 2,
                        startLightness,
                        endLightness,
                        100
                    )
                ),
                // 1
                encodeStr(
                    lerpHue(
                        uint8(addrBytes[31 - 3]),
                        uint8(addrBytes[31 - 6]) % 2,
                        startHue,
                        10
                    ),
                    lerpSaturation(
                        uint8(addrBytes[31 - 3]) % 2,
                        startSaturation,
                        endSaturation,
                        90
                    ),
                    lerpLightness(
                        uint8(addrBytes[31 - 5]) % 2,
                        startLightness,
                        endLightness,
                        90
                    )
                ),
                // 2
                encodeStr(
                    lerpHue(
                        uint8(addrBytes[31 - 3]),
                        uint8(addrBytes[31 - 6]) % 2,
                        startHue,
                        70
                    ),
                    lerpSaturation(
                        uint8(addrBytes[31 - 3]) % 2,
                        startSaturation,
                        endSaturation,
                        70
                    ),
                    lerpLightness(
                        uint8(addrBytes[31 - 5]) % 2,
                        startLightness,
                        endLightness,
                        70
                    )
                ),
                // 3
                encodeStr(
                    lerpHue(
                        uint8(addrBytes[31 - 3]),
                        uint8(addrBytes[31 - 6]) % 2,
                        startHue,
                        90
                    ),
                    lerpSaturation(
                        uint8(addrBytes[31 - 3]) % 2,
                        startSaturation,
                        endSaturation,
                        20
                    ),
                    lerpLightness(
                        uint8(addrBytes[31 - 5]) % 2,
                        startLightness,
                        endLightness,
                        20
                    )
                ),
                // 4
                encodeStr(
                    lerpHue(
                        uint8(addrBytes[31 - 3]),
                        uint8(addrBytes[31 - 6]) % 2,
                        startHue,
                        100
                    ),
                    lerpSaturation(
                        uint8(addrBytes[31 - 3]) % 2,
                        startSaturation,
                        endSaturation,
                        0
                    ),
                    startLightness
                )
            ];
        }
    }
}
