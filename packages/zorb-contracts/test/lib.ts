import { arrayify } from '@ethersproject/bytes'
import tinycolor, { ColorInput } from 'tinycolor2'

const linear = (p: number) => p

const cubicInOut = (p: number) => {
  var m = p - 1,
    t = p * 2
  if (t < 1) return p * t * t
  return 1 + m * m * m * 4
}

const cubicIn = (p: number) => {
  return p * p * p
}

const quintIn = (p: number) => {
  return p * p * p * p * p
}

const inSine2 = (p: number) => {
  return Math.sin(p * Math.PI)
}

const bscale = (byte: number, max: number) => Math.round((byte / 255) * max)

// Util for keeping hue range in 0-360 positive
const clampHue = (h: number) => {
  if (h >= 0) {
    return h % 360.0
  } else {
    return 360 + (h % 360)
  }
}

// scale byte in range min and max
const bScaleRange = (byte: number, min: number, max: number) => {
  return bscale(byte, max - min) + min
}

export const lerpHueFn = (optionNum: number, direction: number) => {
  const option = optionNum % 4
  const multiplier = direction ? 1 : -1
  switch (option) {
    case 0: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 10
        return clampHue(linear(1.0 - pct) * hue + linear(pct) * endHue)
      }
    }
    case 1: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 30
        return clampHue(linear(1.0 - pct) * hue + linear(pct) * endHue)
      }
    }
    case 2: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 50
        let lerpPercent = cubicInOut(pct)
        return clampHue(linear(1.0 - lerpPercent) * hue + lerpPercent * endHue)
      }
    }
    case 3:
    default: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 60 * bscale(optionNum, 1.0) + 30
        let lerpPercent = cubicInOut(pct)
        return clampHue((1.0 - lerpPercent) * hue + lerpPercent * endHue)
      }
    }
  }
}

const lerpLightnessFn = (optionNum: number) => {
  switch (optionNum) {
    case 0: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = quintIn(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
    case 1:
    default: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = cubicIn(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
  }
}

const lerpSaturationFn = (optionNum: number) => {
  switch (optionNum) {
    case 0: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = quintIn(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
    case 1:
    default: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = inSine2(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
  }
}

export const gradientForAddress = (address: string) => {
  const bytes = arrayify(address).reverse()
  const hueShiftFn = lerpHueFn(bytes[3], bytes[6] % 2)
  const startHue = bscale(bytes[12], 360)
  const startLightness = bScaleRange(bytes[2], 30, 70)
  const endLightness =
    (Math.max(startLightness + 20, 98) + bScaleRange(bytes[8], 72, 98)) / 2
  let startSaturation = bScaleRange(bytes[7], 72, 85)
  let endSaturation = Math.max(
    Math.max(startSaturation + 30, 90),
    bScaleRange(bytes[10], 60, 92)
  )
  startSaturation = startSaturation * 0.5 + startLightness * 0.5
  endSaturation = endSaturation * 0.5 + endLightness * 0.5
  const lightnessShiftFn = lerpLightnessFn(bytes[5] % 2)
  const saturationShiftFn = lerpSaturationFn(bytes[3] % 2)
  const inputs: ColorInput[] = [
    {
      h: hueShiftFn(startHue, 0),
      s: saturationShiftFn(startSaturation, endSaturation, 1),
      l: lightnessShiftFn(startLightness, endLightness, 1),
    },
    {
      h: hueShiftFn(startHue, 0.1),
      s: saturationShiftFn(startSaturation, endSaturation, 0.9),
      l: lightnessShiftFn(startLightness, endLightness, 0.9),
    },
    {
      h: hueShiftFn(startHue, 0.7),
      s: saturationShiftFn(startSaturation, endSaturation, 0.7),
      l: lightnessShiftFn(startLightness, endLightness, 0.7),
    },
    {
      h: hueShiftFn(startHue, 0.9),
      s: saturationShiftFn(startSaturation, endSaturation, 0.2),
      l: lightnessShiftFn(startLightness, endLightness, 0.2),
    },
    {
      h: hueShiftFn(startHue, 1),
      s: saturationShiftFn(startSaturation, endSaturation, 0),
      l: startLightness,
    },
  ]

  return inputs;
  // return _(inputs)
  //   .map((c: ColorInput) => tinycolor(c))
  //   .map((tc: tinycolor.Instance) => tc.toHslString())
  //   .value()
}
