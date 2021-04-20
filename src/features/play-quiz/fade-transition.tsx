import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wraps around a FadeTransition. If you want enter AND exit transitions, be sure that you put
 * your FadeTransition inside of a FadeWrapper.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */

interface IWithChildProps {
  children: ReactNode;
}
function FadeWrapper({ children }: IWithChildProps) {
  return <AnimatePresence exitBeforeEnter={true}>{children}</AnimatePresence>;
}

/**
 * Wraps the children in an animated div that fades in and out. Be sure to wrap this in a
 * FadeWrapper component and be sure to assign the FadeTransition a unique key.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */

function FadeTransition({ children }: IWithChildProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 75 }}
      animate={{ opacity: 1, x: 0, transition: { ease: "easeOut" } }}
      exit={{ opacity: 0, x: -75, transition: { ease: "easeIn" } }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export { FadeWrapper, FadeTransition };
