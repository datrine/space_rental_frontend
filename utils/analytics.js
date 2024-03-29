import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToGoogleAnalytics({ name, delta, id }) {
    // Assumes the global `ga()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs
    ga('send', 'event', {
        eventCategory: 'Web Vitals',
        eventAction: name,
        // The `id` value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        eventLabel: id,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // Use a non-interaction event to avoid affecting bounce rate.
        nonInteraction: true,
        // Use `sendBeacon()` if the browser supports it.
        transport: 'beacon',

        // OPTIONAL: any additional params or debug info here.
        // See: https://web.dev/debug-web-vitals-in-the-field/
        // dimension1: '...',
        // dimension2: '...',
        // ...
    });
}
/**
 * 
 * @param {sendToGoogleAnalytics} sendToGoogleAnalytics 
 * @returns 
 */
export default function startAnalytics(sendToGoogleAnalytics) {
    return () => {
        getCLS(sendToGoogleAnalytics);
        getFID(sendToGoogleAnalytics);
        getLCP(sendToGoogleAnalytics);
    }
}

