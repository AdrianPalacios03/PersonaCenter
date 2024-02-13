import { ClientCardProps } from "../../../interfaces/componentProps"
import adsLogo from "../../../assets/ads-logo.png"
import mapsLogo from "../../../assets/maps-logo.webp"
import globe from "../../../assets/globe.webp"
import wp from "../../../assets/wp-icon.webp"
import * as stylex from '@stylexjs/stylex';

export const ClientCard = ({client, onClick, handlePaidCheckbox}: ClientCardProps) => {

    const {fullName, price, paymentDate, website, googleAdsLink, googleMapsLink, phoneNumber, alreadyPaid, category} = client;

    return (
        <div className="client-card" {...stylex.props(s.container)} onDoubleClick={onClick}>
            <div {...stylex.props(s.client)}>
                <div {...stylex.props(s.clientInfo)}>
                    <p {...stylex.props(s.clientInfoItem)}>{fullName}</p>
                </div>
                
                <p {...stylex.props(s.clientInfoItem, s.clientPrice)}>${price}</p>

                <p>PayDay: {paymentDate}</p>
            </div>
            <div {...stylex.props(s.icons)}>
                <a href={website} target="_blank"><img {...stylex.props(s.icon)} src={globe}/></a>
                <a href={googleAdsLink} target="_blank"><img {...stylex.props(s.icon)} src={adsLogo}/></a>
                <a href={googleMapsLink} target="_blank"><img {...stylex.props(s.icon)} src={mapsLogo}/></a>
                <a href={`https://wa.me/${phoneNumber}`}><img {...stylex.props(s.icon)} src={wp}/></a>
                <input {...stylex.props(s.checkBox)} type="checkbox" checked={alreadyPaid} onChange={() => {handlePaidCheckbox(website)}}/>
                {
                    category === 'nut'
                    ?
                    <div {...stylex.props(s.catLabel, s.nutriLabel)}>
                        <i className='fa-solid fa-apple-whole'/>
                    </div>
                    :
                    <div {...stylex.props(s.catLabel, s.psycoLabel)}>
                        <i className='fa-solid fa-brain'/>
                    </div>
                }
            </div>


        </div>
    )
}


const s = stylex.create({
    container: {
        display: 'flex',
        flexDirection: {
            default: 'row',
            '@media (max-width: 690px)': 'column'
        },
        gap: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        justifyContent: 'space-between',
        alignItems: 'center',
        // maxWidth: 1200,
        width: '100%',
        padding: '10px 20px',
        borderRadius: 10,
        transition: 'all 0.3s ease',
        ':hover': {
            background: 'rgba(255,255,255,0.1)',
        },
        userSelect: 'none',

        animation: 'fadeLeft .3s'
    },

    client: {
        display: 'flex',
        gap: '15px'
    },

    clientInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    
    clientInfoItem: {
        fontWeight: 'bold',
        margin: 0,
        padding: 0,
        minWidth: 150,
    },

    clientPrice: {
        minWidth: 50
    },

    icons: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: 200,
    },

    icon: {
        width: 25,
        height: 25,
        fontSize: 20,
        borderRadius: 5,
        padding: 2,
        margin: 0,
        marginRight: 10,
        transition: 'all 0.3s ease',
        ':hover': {   
            background: 'rgba(255,255,255,0.1)',
        }
    },

    catLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '2px 10px',
        borderRadius: 5,
    },

    checkBox: {
        marginRight: {
            default: 10,
            '@media (max-width: 690px)': 20
        },
        marginLeft: {
            default: 0,
            '@media (max-width: 690px)': 10
        },
        transform: {
            default: 'scale(1.1)',
            '@media (max-width: 690px)': 'scale(1.5)'
        }
    },

    // create psycologist and nutriologist labels, one with soft purple and the other with soft green as background and hard purple and green as color
    psycoLabel: {
        background: '#dfb3ff',
        color: '#a72bff',
    },
    nutriLabel: {
        background: '#b8ffde',
        color: '#007840',
    }


})