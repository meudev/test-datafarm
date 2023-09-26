export interface IFarm {
    id: number;
    name: string;
    growerId: number;
    growerName: string;
    fields: IField[];
}

export interface IField {
    id: number;
    name: string;
}