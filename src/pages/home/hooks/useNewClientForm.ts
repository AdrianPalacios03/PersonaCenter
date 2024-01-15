import { useState } from "react";
import { Client } from "../../../interfaces/componentProps";

export const clientInitialState: Client = {
  fullName: '',
  website: '',
  googleAdsLink: '',
  googleMapsLink: '',
  phoneNumber: '',
  category: 'nut',
  price: '',
  alreadyPaid: false,
  paymentDate: '',
} 

export const useNewClientForm = ( initialForm: Client = clientInitialState) => {

    const [formState, setFormState] = useState(initialForm)

    const resetState = () => {
      setFormState(initialForm)
    }

    const onInputChange = ({target}: any) => {
      const {name, value} = target;
      setFormState({
        ...formState,
        [name]: value
      });
    }

    const setClientForm = (client: Client) => {
      setFormState(client)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        setClientForm,
        resetState

    }
}