import Lote from "../models/lote.js";
import helpersGeneral from "./generales.js";

const helpersLote = {
  existeId: async (id, req) => {
    const existe = await Lote.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.LoteUpdate = existe;
  },

  existeNombre: async (nombre, req) => {
    if (nombre) {
      const nombreSinTildes = await helpersGeneral.quitarTildes(nombre.toLowerCase());
      console.log(nombreSinTildes);
      const primeraMayuscula = await helpersGeneral.primeraMayuscula(nombreSinTildes);

      const existe = await Lote.findOne({ nombre: primeraMayuscula.trim() });
      console.log(existe);

      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese nombre en la base de datos!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese nombre en la base de datos!!! `);
        }
      }
    }
  },
};
export default helpersLote;
