import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { ClientCard } from './components/ClientCard';
import { ClientCardProps } from '../../interfaces/componentProps';
import { getClients } from '../../database/getClients';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { saveClientsList } from '../../database/saveClientList';
import { PlusButton } from './components/PlusButton';
import PopUp from './components/PopUp';
import { togglePopUp } from '../../store/slices/popUp/popUpSlice';
import { clientInitialState, useNewClientForm } from './hooks/useNewClientForm';
import { runPaymentVerification } from '../../database/runPaymentVerification';
export const Home = () => {

    const user = useAppSelector((state) => state.auth.user);
    const popUpOpen = useAppSelector((state) => state.popUp.open);
    const dispatch = useAppDispatch();
    const [clientsList, setClientsList] = useState<ClientCardProps[]>([]);
    const { formState, onInputChange, setClientForm } = useNewClientForm();
    const [edittingClient, setEdittingClient] = useState({
            editting: false,
            client: clientInitialState
        }
    );

    const fetchClients = async () => {
        await getClients(user).then((clients) => {
        setClientsList(clients);
        }).finally(() => {
            runPaymentVerification(user!, clientsList);
        })
    }

    useEffect(() => {
        fetchClients();


    }, []);

    const saveClients = () => {
        saveClientsList(user, {clients: clientsList});
    }

    const handleInputChange = (e: any) => {
        onInputChange(e);
    }

    const handleSaveClient = () => {
        const editting = edittingClient.editting;

        if (editting) {
            const newClientsList = clientsList.map((client) => {
                if (client.website === edittingClient.client.website) {
                    return formState;
                }
                return client;
            });

            setClientsList(newClientsList);
        } else {
            setClientsList([...clientsList, formState]);
        }

        dispatch(togglePopUp(false));
    }

    const handleClientClick = (client: ClientCardProps) => {
        setClientForm(client);
        setEdittingClient({
            editting: true,
            client
        });
        dispatch(togglePopUp(true));
    }

    const onPopUpClose = () => {
        dispatch(togglePopUp(false));
        setClientForm(clientInitialState);
        setEdittingClient({
            editting: false,
            client: clientInitialState
        });
    }

    const deleteClient = () => {
        const newClientsList = clientsList.filter((client) => client.website !== edittingClient.client.website);
        setClientsList(newClientsList);
        dispatch(togglePopUp(false));
        setClientForm(clientInitialState);
        setEdittingClient({
            editting: false,
            client: clientInitialState
        });
    }
    

    return (
        <div {...stylex.props(s.container)}>

            <h1>Clients</h1>
            
            <div {...stylex.props(s.clientsContainer)}>
                {
                    clientsList.map((client) => {
                        return (
                            <ClientCard {...client} onClick={() => handleClientClick(client)} key={client.website}/>
                        )
                    })
                }
            </div>

            <div>
                <button onClick={saveClients} className='btn'><i className='fa-solid fa-floppy-disk'/> SAVE</button>
            </div>

            <PopUp 
                visible={popUpOpen}
                onClose={onPopUpClose} 
                {...stylex.props(s.popUp)}    
            >
                <h2>
                    {
                        edittingClient.editting
                        ?
                        `Edit ${edittingClient.client.fullName}`
                        :
                        'New client'
                    }
                </h2>
                <input type='text' name='fullName' placeholder='Full name' value={formState.fullName} onChange={handleInputChange}/>
                <input type='text' name='website' placeholder='Website' value={formState.website} onChange={handleInputChange}/>
                <input type='text' name='googleAdsLink' placeholder='Ads link' value={formState.googleAdsLink} onChange={handleInputChange}/>
                <input type='text' name='googleMapsLink' placeholder='Maps link' value={formState.googleMapsLink} onChange={handleInputChange}/>
                <input type='text' name='phoneNumber' placeholder='Phone number' value={formState.phoneNumber} onChange={handleInputChange}/>
                <input type='text' name='price' placeholder='Price' value={formState.price} onChange={handleInputChange}/>
                <input type='text' name='paymentDate' placeholder='Payment Date' value={formState.paymentDate} onChange={handleInputChange}/>
                <select {...stylex.props(s.select)} name='category' value={formState.category} onChange={handleInputChange}>
                    <option value='nut'>Nutriologo</option>
                    <option value='psic'>Psicologo</option>
                </select>

                
                <div {...stylex.props(s.popUpsBtns)}>
                    <button onClick={() => handleSaveClient()} className='btn'><i className='fa-solid fa-floppy-disk'/> Save</button>
                    {
                        edittingClient.editting
                        &&
                        // delete button
                        <button className='btn' onClick={deleteClient}><i className='fa-solid fa-trash'/> Delete</button>
                    }
                </div>
            </PopUp>

            <PlusButton/>
        </div>
    )
}


const s = stylex.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '120px 1rem',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    clientsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        alignItems: 'center'

    },
    popUp: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        gap: '1rem',
    },
    select: {
        width: '100%'
    },
    popUpsBtns: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center'
    }

});