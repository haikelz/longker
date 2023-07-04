import { Box, VStack } from "@chakra-ui/react";
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from "framer-motion";
import { useLocation } from "react-router-dom";
import { ChildrenProps } from "~/models";
import Footer from "./Footer";
import Navbar from "./Navbar";

const variants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

export default function Layout({ children }: ChildrenProps) {
  const location = useLocation();

  return (
    <>
      <Box w="full">
        <Navbar />
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait" key={location.pathname}>
            <m.div
              variants={variants}
              transition={{ duration: 0.4 }}
              initial="hidden"
              animate="visible"
            >
              <VStack>{children}</VStack>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
        <Footer />
      </Box>
    </>
  );
}
