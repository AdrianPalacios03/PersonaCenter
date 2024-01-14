import { useState } from "react";
import { ClientCardProps } from "../../../interfaces/componentProps";

export const clientInitialState: ClientCardProps = {
  fullName: '',
  website: '',
  googleAdsLink: '',
  googleMapsLink: '',
  phoneNumber: '',
  category: 'nut',
  price: '',
  paymentDate: '',
} 

export const useNewClientForm = ( initialForm: ClientCardProps = clientInitialState) => {

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

    const setClientForm = (client: ClientCardProps) => {
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