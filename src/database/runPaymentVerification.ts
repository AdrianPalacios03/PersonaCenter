import { User } from "firebase/auth";
import { ClientCardProps } from "../interfaces/componentProps";

export const runPaymentVerification = async (user: User, clients: ClientCardProps[]) => {
    // * 1. Comprobar si el mes actual != del db/currentMonth
    // * 2. Si es así, actualizar db/currentMonth

}