export interface Client {
    fullName: string,
    website: string,
    googleAdsLink: string,
    googleMapsLink: string,
    phoneNumber: string,
    category: ClientType,
    price: string,
    profit: string,
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

export interface PlusButtonProps {
    onClick: () => void,
    todosBtn?: boolean
}

export interface Todo {
    title: string,
    description?: string,
    done: boolean,
    priority: TodoPriority,
}

export interface TodoCardProps {
    todo: Todo,
    onClick: () => void,
    onDoneCheckbox: (title: string) => void,
    style1?: boolean
}


type TodoPriority = 'none' | 'green' | 'blue' | 'red'



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

