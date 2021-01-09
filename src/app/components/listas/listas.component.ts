import { Component, Input, ViewChild } from "@angular/core";
import { DeseosService } from "../../services/deseos.service";
import { Lista } from "../../models/lista.model";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async modificarLista(lista: Lista) {
    // console.log(lista);
    const listaId = lista.id;
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Editar lista",
      inputs: [
        {
          name: "titulo",
          type: "text",
          value: lista.titulo,
          placeholder: "Nombre de la lista",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            this.lista.closeSlidingItems();

            console.log("Cancelar");
          },
        },
        {
          text: "Actualizar",
          handler: (data) => {
            // console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;

            this.deseosService.guardarStorage();

            this.lista.closeSlidingItems();
          },
        },
      ],
    });

    alert.present();
  }
}
