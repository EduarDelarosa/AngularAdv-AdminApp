
interface _hospitalUsuario {
  nombre: string;
  _id: string;
  img: string;
}

export class Hospital {

  constructor(
    public nombre: string,
    public _id?: any,
    public usuario?: _hospitalUsuario,
    public img?: string,
  ) { }
}
