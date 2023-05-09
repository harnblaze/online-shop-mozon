import {toast} from "react-toastify";

export const showNotification = (flag: boolean, action: string): void => {
    if (flag) {
        toast.success(`Товар был успешно ${action}`)
    } else {
        toast.error(`Товар не был ${action}`)
    }
}
