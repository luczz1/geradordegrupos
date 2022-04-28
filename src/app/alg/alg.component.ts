import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alg',
  templateUrl: './alg.component.html',
  styleUrls: ['./alg.component.css'],
})
export class AlgComponent implements OnInit {
  grupo1: string[] = [];
  grupo2: string[] = [];
  nomes: string[] = ['Participante 1', 'Participante 2', 'Participante 3', 'Participante 4'];
  numeros: number[] = [];
  primeiroGrupo: string = ''
  vezesGerado: number = 0
  grupo1Wins: number = 0
  grupo2Wins: number = 0
  loading: boolean = false
  loadingRes: boolean = false

  constructor() {}

  ngOnInit(): void {}

  randomizeGroups() {
    this.loading = true
    this.resetAll()

    while (this.numeros.length < 4) {
      let num = Math.trunc(Math.random() * 4);

      if (this.numeros.includes(num)) {
        this.numeros.splice(num);
        let num2 = Math.trunc(Math.random() * 4);

        while (num2 == num) {
          num2 = Math.trunc(Math.random() * 4);
        }
        if (!this.numeros.includes(num2)) {
          this.numeros.push(num2);
        }
      }
      if (!this.numeros.includes(num)) {
        this.numeros.push(num);
      }
    }

    setTimeout(() => {
      this.loading = false
      this.grupo1.push(this.nomes[this.numeros[0]], this.nomes[this.numeros[1]]);
    }, 3000)
    setTimeout(() => {
      this.grupo2.push(this.nomes[this.numeros[2]], this.nomes[this.numeros[3]]);
      this.firstGroupToEat()
    }, 4000)
  }

  firstGroupToEat() {
    this.primeiroGrupo = ''
    this.loadingRes = true
    setTimeout(() => {
      this.loadingRes = false
      this.vezesGerado++
      let num = Math.trunc(Math.random() * 2);
      let grupos = ['Grupo 1', 'Grupo 2']
      this.primeiroGrupo = grupos[num]
      if(this.primeiroGrupo == 'Grupo 1') {
        this.grupo1Wins++
      } else {
        this.grupo2Wins++
      }
    }, 2000)
  }

  resetAll() {
    this.numeros = [];
    this.grupo1 = [];
    this.grupo2 = [];
    this.vezesGerado = 0
    this.primeiroGrupo = ''
    this.grupo1Wins = 0
    this.grupo2Wins = 0
  }
}
