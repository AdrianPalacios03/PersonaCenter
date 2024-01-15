import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { ClientCard } from './components/ClientCard';
import { Client } from '../../interfaces/componentProps';
import { getClients } from '../../database/getClients';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { saveClientsList } from '../../database/saveClientList';
import { PlusButton } from './components/PlusButton';
import PopUp from './components/PopUp';
import { togglePopUp } from '../../store/slices/popUp/popUpSlice';
import { clientInitialState, useNewClientForm } from './hooks/useNewClientForm';
import { runPaymentVerification } from '../../database/runPaymentVerification';
import { getCurrentMonth } from '../../util/getCurrentMonth';
import { setDebtors } from '../../database/DBDebtors';
import { Debtor } from './components/Debtor';
export const Home = () => {

    const user = useAppSelector((state) => state.auth.user);
    const popUpOpen = useAppSelector((state) => state.popUp.open);
    const dispatch = useAppDispatch();
    const [clientsList, setClientsList] = useState<Client[]>([]);
    const { formState, onInputChange, setClientForm } = useNewClientForm();
    const [debtorsList, setDebtorsList] = useState<string[] | undefined>([])
    const [edittingClient, setEdittingClient] = useState({
            editting: false,
            client: clientInitialState
        }
    );

    const fetchClients = async () => {
        await getClients(user).then(async (clients) => {
            setClientsList(clients);
            await runPaymentVerification(user!, clients, setClientsList).then((data) => {
                setDebtorsList(data);
            });
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

    const handleClientClick = (client: Client) => {
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

    const handlePaidCheckbox = (website: string) => {
        const newClientsList = clientsList.map((c) => {
            if (c.website === website) {
                return {
                    ...c,
                    alreadyPaid: !c.alreadyPaid
                }
            }
            return c;
        });
        setClientsList(newClientsList);
    }

    const onDeleteDebtor = (debtor: string) => {
        if (confirm(`Are you sure you want to delete ${debtor}?`) === false) return;
        const newDebtorsList = debtorsList?.filter((d) => d !== debtor);
        setDebtorsList(newDebtorsList);
        setDebtors(user!, newDebtorsList!);
    }
    

    return (
        <div {...stylex.props(s.container)}>

            <h1>Clients <span {...stylex.props(s.month)}>~ {getCurrentMonth().fullDate}</span></h1>
            
            <div {...stylex.props(s.clientsContainer)}>
                {
                    clientsList.map((client) => {
                        return (
                            <ClientCard 
                                client={client}
                                onClick={() => handleClientClick(client)} 
                                handlePaidCheckbox={handlePaidCheckbox}
                                key={client.website}
                            />
                        )
                    })
                }
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

            {
                debtorsList?.length !== 0
                &&
                <div>
                    <h2>Debtors</h2>
                    <ul {...stylex.props(s.dList)}>
                        {
                            debtorsList?.map((debtor, index) => {
                                return (
                                    <Debtor debtor={debtor} onclick={() => onDeleteDebtor(debtor)} key={index}/>
                                )
                            })
                        }
                    </ul>
                </div>
            }

            <PlusButton onClick={saveClients}/>
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
    month: {
        color: 'grey',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginLeft: '1rem'
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
    },
    dList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        alignItems: 'flex-start',
        listStyle: 'none',
        marginTop: '20px'
    }

});