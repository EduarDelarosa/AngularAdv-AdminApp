import { Hospital } from "./hospital.model";

interface _usuariosMedico {
  nombre: string;
  _id: string;
  img: string;
}

export class Medico {

  constructor(
    public nombre: string,
    public _id?: any,
    public img?: string,
    public usuario?: _usuariosMedico,
    public hospital?: Hospital
  ) { }
}
