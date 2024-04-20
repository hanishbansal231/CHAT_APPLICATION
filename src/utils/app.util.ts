import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { decrypt } from "./cryptoHelper";

export const useDecryptedToken = (): string => {
    const { token } = useSelector((state: RootState) => state.auth);
    return decrypt(token ?? '');
};
