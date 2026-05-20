import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';

// object with left and top - created in the return cleanup
interface ScrollCoordinatesObj {
    left: number;
    top: number;
};

// Record type shorthand instead of index signature since it's always object with key as the path name and value is the coordinates object or just empty
type ScrollPositionHistory = Record<string, ScrollCoordinatesObj>;

// custom hook for restoring scroll position
export function useScrollRestoration() {
    // current location from react router
    const location = useLocation();
    // this will allow more control over the scroll behavior for first clicks or manual back/forward nav from the browser
    const navType = useNavigationType();
    // useRef will store scroll data without triggering rerenders - the ref is { current: {} } - current is what would be appended and typed
    const scrollPosition = useRef<ScrollPositionHistory>({});

    // logic when a route is hit - navType will determine if we pull scroll history or reset to the top
    useEffect(() => {
        // disable browser native scroll restoration that interferes when manual refresh from browser and only use the history object
        history.scrollRestoration = 'manual';

        // POP means when you use back/forward buttons on the browser, it'll pull the last known scroll position
        if (navType === 'POP' && scrollPosition.current[location.pathname]) {
            // TODO: figure out how to delay it to wait until data fetch and the whole DOM loads to avoid it not going to the right position
            // window.scrollTo(scrollPosition.current[location.pathname]);
            
            // TEMP: just do 0, 0 for now
            window.scrollTo(0,0)
        } else {
            // first visits to route & fresh nav link clicks OR a manual refresh always go back to the top bc the ref is reset to {}
            window.scrollTo(0, 0)
        }

        // cleanup - it'll store the path name as a string key and the object with the positions as values before going to a new location and running this useEffect again
        return () => {
            scrollPosition.current[location.pathname] = {
                left: window.scrollX,
                top: window.scrollY
            };
        }
    }, [location, navType])
}