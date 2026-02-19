/**
 * Central GSAP + ScrollTrigger setup
 * Import this ONCE at the app root to register the plugin globally.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
