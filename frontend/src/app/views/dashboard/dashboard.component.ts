import { DOCUMENT, NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  BadgeComponent
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {
  ButtonCloseDirective,
  CardImgDirective,
  CardTitleDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
} from '@coreui/angular';
import { Router } from '@angular/router';

import { ArtikliService } from '../../services/artikli.service';
import { AuthService } from '../../services/auth.service';
import { KosaricaService } from '../../services/kosarica.service';
import { NarudzbaService } from '../../services/narudzba.service';

interface Artikl {
  idartikl: number;
  naziv: string;
  sifra: number;
  cijena: string;
}

// tablica artikl nema stupac za sliku, pa se slika bira po nazivu
const SLIKE: Record<string, string> = {
  'Hrana za pse': 'assets/images/food.jpg',
  'Ogrlica za pse': 'assets/images/collar.jpg',
  'Poslastica za pse': 'assets/images/cookies.jpg'
};
const ZADANA_SLIKA = 'assets/images/accessories.jpg';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [WidgetsDropdownComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent, ButtonCloseDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    BadgeComponent,
    CardImgDirective,
    CardTitleDirective,
    CommonModule]
})
export class DashboardComponent implements OnInit {

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  readonly kosarica = inject(KosaricaService);
  readonly #artikliService = inject(ArtikliService);
  readonly #narudzbaService = inject(NarudzbaService);
  readonly #auth = inject(AuthService);
  readonly #router = inject(Router);

  public artikli: Artikl[] = [];

  public visible = false;

  public saljeSe = false;
  public porukaNarudzbe = '';
  public greskaNarudzbe = '';

  ucitajArtikle() {
    this.#artikliService.getArtikli().subscribe({
      next: (data: Artikl[]) => this.artikli = data,
      error: (err) => console.error("Greška pri dohvacanju artikala", err)
    });
  }

  slika(naziv: string): string {
    return SLIKE[naziv] ?? ZADANA_SLIKA;
  }

  dodajUKosaricu(artikl: Artikl) {
    this.kosarica.dodaj(artikl);
    this.porukaNarudzbe = '';
  }

  naruci() {
    // narudžba se veže uz korisnika, pa treba prijava (košarica ostaje spremljena)
    if (!this.#auth.currentUserValue) {
      this.visible = false;
      this.#router.navigate(['/login']);
      return;
    }

    const stavke = this.kosarica.stavke.map(s => ({ idartikl: s.idartikl, kolicina: s.kolicina }));

    this.saljeSe = true;
    this.greskaNarudzbe = '';

    this.#narudzbaService.posaljiNarudzbu(stavke).subscribe({
      next: (narudzba) => {
        this.saljeSe = false;
        this.kosarica.isprazni();
        this.porukaNarudzbe = `Narudžba ${narudzba.do_broj} je zaprimljena.`;
      },
      error: (err) => {
        this.saljeSe = false;

        // sesija je istekla
        if (err.status === 401) {
          this.#auth.clearUser();
          this.visible = false;
          this.#router.navigate(['/login']);
          return;
        }

        this.greskaNarudzbe = err.error?.message || 'Greška pri slanju narudžbe';
      }
    });
  }



  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
    this.ucitajArtikle();
    this.initCharts();
    this.updateChartOnColorModeChange();
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }


  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }

   test(){
    this.visible = !this.visible;
  } 

  public visiblity = false;

  handleLiveDemoChange(event: any) {
    this.visible = event;
  } 

  toggleModal() {
    this.visible = !this.visible;
  }

}