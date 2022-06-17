import * as React from "react"
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
} from "@chakra-ui/react"


const spin = keyframes`
  from { transform: rotate(0deg); }
  20% { transform: rotate(20deg); }
  50% { transform: rotate(0deg); }
  80% { transform: rotate(-20deg); }
  100% { transform: rotate(0deg); }
`

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 5s linear`

  return <chakra.img animation={animation} src='/logo.png' ref={ref} {...props} />
})
