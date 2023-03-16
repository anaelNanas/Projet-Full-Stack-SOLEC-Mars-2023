import { CreneauType } from './CreneauType';

export type OutilType = {
    _id: string,
    name: string,
    description: string,
    __v: number,
    image: string,
    specifications: string[],
    creneauxOutil: CreneauType[]
}
  