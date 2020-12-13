class Person {
  static ID_COUNTER = 1;
  constructor(name, age, cpf) {
    this.id = Person.ID_COUNTER++;
    this.name = name;
    this.cpf = cpf;
    this.age = age;
  }

  reverseName() {
    this.name = this.name.split('').reverse().join('');
  }
}

export default Person;
