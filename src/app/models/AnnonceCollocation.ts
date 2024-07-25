import { TypeAnnoCollo } from "./TypeAnnoCollo";
import { TypeLogement } from "./TypeLogement";
import { FileHandle } from "./file_handle.model";

export interface AnnonceCollocation {
    id?: number;
    dateDispo: Date;
    nbreChmbre: number;
    descrption: string;
    montant: number;
    nbrePerson: number;
    typeLogement: TypeLogement; 
    typeAnnoColloc: TypeAnnoCollo; 
    user?: any;
    avisList?: any[]; 
    demandeVisite?: any[];
    imageModels:FileHandle[];
}