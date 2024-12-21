import { createApp } from "vue";
import Toaster from "./Toaster.vue";

const showToast = (message, type = "info") => {
const app = createApp(Toaster, {
message,
type,
});
const container = document.createElement("div");
document.body.appendChild(container);
app.mount(container);

setTimeout(() => {
app.unmount();
document.body.removeChild(container);
}, 2500);
};

export default showToast;
