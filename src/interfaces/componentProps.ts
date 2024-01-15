export interface Client {
    fullName: string,
    website: string,
    googleAdsLink: string,
    googleMapsLink: string,
    phoneNumber: string,
    category: ClientType,
    price: string,
    paymentDate: string,
    alreadyPaid: boolean,
    onClick?: () => void
}

export type ClientType = 'nut' | 'psic'

export interface ClientCardProps {
    client: Client,
    onClick?: () => void
    handlePaidCheckbox: (website: string) => void
}

export interface DebtorProps {
    debtor: string,
    onclick: (debtor: string) => void
}

interface NavBarItem {
    name: string,
    url: string,
}

export interface NavBarProps {
    routes?: NavBarItem[],
    height?: number,
    backgroundColor?: string,
    sideBarColor?: string,
    padding?: string,
    buttonsMarginRight?: number
}

