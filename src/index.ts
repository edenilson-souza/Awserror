import { OrError, TOrError, TypeErrorMessageOutput } from "./errorHandle";
import OrErrorEvent from "./eventHandle";

OrErrorEvent.on("error", () => {});

export default OrError;
export { OrErrorEvent, TOrError, TypeErrorMessageOutput };
