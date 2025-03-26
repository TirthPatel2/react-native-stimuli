import HomeScreen from "@/app/index";
import ResultScreen from "@/app/Result";
import TimerAnimation from "@/app/TimerAnimation";

export const routes = [
    { name: "Home", label: "Home", component: HomeScreen, icon: "home" },
    { name: "Result", label: "Saved", component: ResultScreen, icon: "content-save-all" },
    { name: "Timer Animation", label: "Animation", component: TimerAnimation, icon: "timelapse" },
];
