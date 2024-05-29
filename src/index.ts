import { OrError, TOrError, TypeErrorMessageOutput } from "./errorHandle";
import OrErrorEvent from "./eventHandle";

OrError.setEventHandle(OrErrorEvent);

// const OrErrorEventEmit = (event: string, data: TOrError): void => {
//     OrErrorEvent.emit(event, data);
// };

export default OrError;
export { OrErrorEvent, TOrError, TypeErrorMessageOutput };
