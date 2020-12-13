class Team {
  static ID_COUNTER = 1;

  constructor(name, year, state) {
    this.id = Team.ID_COUNTER++;
    this.year = year;
    this.name = this.reverseName(name);
    this.state = state;
  }

  reverseName(name) {
    const arrAlphabet = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let arrName = name.toUpperCase().split('');
    const arrYear = this.year.split('');
    const sumYear = arrYear.reduce((total, next) => {
      return parseInt(total) + parseInt(next);
    });

    for (const index in arrName) {
      const indexLetter = arrAlphabet.indexOf(arrName[index]) + sumYear;
      if (indexLetter >= 26) {
        arrName[index] = arrAlphabet[indexLetter - 26];
      } else {
        arrName[index] = arrAlphabet[indexLetter];
      }
    }
    const newName = arrName.reduce((total, next) => {
      return total + next;
    });
    this.name = newName;
    return newName;
  }
}

export default Team;
