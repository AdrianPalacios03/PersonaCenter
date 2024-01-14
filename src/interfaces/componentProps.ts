export interface ClientCardProps {
    fullName: string,
    website: string,
    googleAdsLink: string,
    googleMapsLink: string,
    phoneNumber: string,
    category: Client,
    price: string,
    paymentDate: string,
    onClick?: () => void
}

export type Client = 'nut' | 'psic'

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

