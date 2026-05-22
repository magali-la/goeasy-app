import { AnimatePresence, easeOut, motion } from "motion/react"
import { useLocation } from "react-router"

// this is being used as an entire wrapper around the Routes in App.tsx. it needs children, not outlet to correctly access the page component in the route children
export function PageTransition({ children }: { children: React.ReactNode}) {
    const location = useLocation()

    // variable if the path is the landing, uses custom exit animation only 
    const isLanding = location.pathname === "/";

    return (
        // wait lets the animation completely finish on exit of the prev component before the new component comes in 
        <AnimatePresence mode="wait">
            <motion.div
                // it's going to wrap whichever page component the route is currently on - the key is necessary for AnimatePresence to know if a change is about to be made in the DOM to do the exit animation - since the children of this is a react router route attached to a page component, use the pathname to signal this change
                key={location.pathname}
                // bc of wait mode - need high opacity so it doesn't feel like a long blinking of nothing as the page transitions. need very low subtle y values as it'll be seen more easily as each does its own animation fully
                // on enter - fade in from the top except landing
                initial={isLanding ? { opacity: 0.9 } : { opacity: 0.8, y: -2 }}
                // final destination
                animate={{ opacity: 1, y: 0 }}
                // on exit - fade out to the bottom except landing just fades out to avoid white space with the gradient bg
                exit={isLanding ? { opacity: 0.7 } : { opacity: 0.8, y: 2 }}
                // transition duration - easeOut slows at the end
                transition={{ duration: .12, ease: easeOut}}
            >
                {/* this represents the component of the current route path */}
                {children}
            </motion.div>
        </AnimatePresence>
    )
}