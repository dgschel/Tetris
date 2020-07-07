import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Game-Loop-Project';

  squares = [];
  xIsNext = true;
  player: 'O' | 'X' | string;
  runningGame = true;
  playerWon: string;
  playerX = 'X';

  possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() { }

  ngOnInit() {
    this.squares = Array.from({ length: 9 }).fill(null).map(() => ({ value: '' }));
  }

  onClick(index: number) {
    if (this.runningGame) {
      if (!this.squares[index].value) {
        const currentPlayer = this.getPlayer();
        const indexes = [];

        this.squares[index].value = currentPlayer;
        this.xIsNext = !this.xIsNext;

        this.squares.forEach((ele, i) => {
          if (ele.value === currentPlayer) {
            indexes.push(i);
          }
        });

        this.runningGame = !this.matchWon(indexes, currentPlayer);

        if (!this.runningGame) {
          this.playerWon = currentPlayer;
        }
      }
    }
  }

  matchWon(data: number[], player: string): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.possibleWins.length; index++) {
      const arr = this.possibleWins[index];

      if (this.check(data, arr)) {
        return true;
      }
    }

    return false;
  }

  check = (source, target) => target.every(v => source.includes(v));

  getPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }
}
