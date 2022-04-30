import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alg',
  templateUrl: './alg.component.html',
  styleUrls: ['./alg.component.css'],
})
export class AlgComponent implements OnInit {

  //grupos
  grupo1: string[] = [];
  grupo2: string[] = [];

  //form
  nomes: string[] = ['Participante 1', 'Participante 2', 'Participante 3', 'Participante 4'];
  formNomes = new FormGroup({
    "n1": new FormControl(),
    "n2": new FormControl(),
    "n3": new FormControl(),
    "n4": new FormControl()
  })
  numeros: number[] = [];
  primeiroGrupo: string = ''
  vezesGerado: number = 0
  formDisabled: boolean = false

  //wins
  grupo1Wins: number = 0
  grupo2Wins: number = 0

  //loading
  loading: boolean = false
  loadingRes: boolean = false


  constructor() {}

  ngOnInit(): void {}

  randomizeGroups() {
    if(this.formNomes.valid) {
      this.formDisabled = true
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
      } else {
        this.formNomes.get('n1').markAsDirty()
        this.formNomes.get('n2').markAsDirty()
        this.formNomes.get('n3').markAsDirty()
        this.formNomes.get('n4').markAsDirty()
      }
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
      this.formDisabled = false
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
