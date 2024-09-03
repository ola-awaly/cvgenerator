export interface UserItem{
    
        id?: number,
        prenom: string,
        nom: string,
        adresse: string,
        cp: string,
        ville: string,
        pays:string,
        tel: string,
        mobile: string,
        email: string,
        dateDeNaissance: Date,
        role?: string,
        password?: string,
        createdAt: string,
        updatedAt: string,
        deletedAt: string
    
}