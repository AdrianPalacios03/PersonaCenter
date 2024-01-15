import { User } from "firebase/auth";
import { Client } from "../interfaces/componentProps";
import { getCurrentMonth } from "../util/getCurrentMonth";
import { getDBMonth, setDBMonth } from "./DBMonth";
import { getDebtors, setDebtors } from "./DBDebtors";
import { saveClientsList } from "./saveClientList";

export const runPaymentVerification = async (user: User, clients: Client[], setClients: (clients: Client[]) => void) => {
    // * 1. Comprobar si el mes actual != del db/currentMonth
    const currentMonth = getCurrentMonth().monthName;
    const dbMonth = await getDBMonth(user);
    const dbDebtors = await getDebtors(user);
     
    // * 2. Si es así, actualizar db/currentMonth
    if (currentMonth !== dbMonth) {
        let debtors: string[] = [];
        // * 3. Recorrer todos los clientes y comprobar si tienen pagos pendientes
        clients.forEach((client) => {
            // * 4. Si tienen pagos pendientes, agregarlos a un debtors array
            if (!client.alreadyPaid) {
                debtors.push(
                    `${client.fullName} debe ${currentMonth} por ${client.price}`
                );
            }
            // * 5. Resetear el alreadyPaid de todos los clientes
            client.alreadyPaid = false;
        });

        // * Se actualiza el estado de los clientes y se guarda en db/clients
        setClients(clients);
        saveClientsList(user, {clients});

        // * 6. Agregar los nuevos debtors al array
        debtors.forEach((debtor) => {
            dbDebtors.push(debtor);
        });

        // * 7. Actualizar db/debtors
        await setDebtors(user, dbDebtors);
        await setDBMonth(user, currentMonth);
        
        return dbDebtors;
    } else {
        return dbDebtors;
    }


}