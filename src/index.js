import express from 'express';
import Person from './person';
import MilesRegister from './miles';
import Team from './team';
import Classs from './classs';
import Student from './student';

const app = express();
app.use(express.json());

//Método GET

//Exercicio 1
app.get('/calculadora/:operation', (request, response) => {
  const { operation } = request.params;
  let { valorA, valorB } = request.query;
  let result = 0;

  valorA = parseInt(valorA);
  valorB = parseInt(valorB);
  switch (operation) {
    case 'somar':
      result = valorA + valorB;
      break;
    case 'subtrair':
      result = valorA - valorB;
      break;
    case 'multiplicar':
      result = valorA * valorB;
      break;
    case 'dividir':
      result = valorA / valorB;
      break;
    default:
      return response.status(400).json({ error: 'Operação inválida' });
  }

  return response.json({ result });
});

//Exercicio 2

let count = 0;
app.get('/plus', (request, response) => {
  if (count < 9) {
    count++;
    return response.json({ count });
  }
  count = 0;
  return response.json({ message: 'Chegou a 10' });
});

//Exercicio 3
app.get('/numeral/:operation', (request, response) => {
  let { operation } = request.params;
  let { number } = request.query;
  let result = parseInt(number);

  // const result = operation == 'anterior' ? number-- : number++;
  switch (operation) {
    case 'anterior':
      result--;
      return response.json(result);
    case 'proximo':
      result++;
      return response.json(result);
    default:
      return response.status(404).json({ error: 'Operation not found' });
  }
});

//Exercicio 4
app.get('/inverter-string', (request, response) => {
  const { word } = request.query;
  const result = word.split('').reverse().join('');

  return response.json({ result });
});

//Exercicio 5
const arr5 = [];
app.get('/remove-vowel', (request, response) => {
  const { value } = request.query;
  const arrVowel = ['a', 'e', 'i', 'o', 'u'];
  let newValue = value.toLowerCase().split('');
  const result = newValue.filter((letter) => {
    if (!arrVowel.includes(letter)) {
      return letter;
    }
  });
  arr5.push(result.join(''));
  return response.json({ arr5 });
});

//Exercicio 6
let people = [];
app.get('/add-person', (request, response) => {
  const { name, age, cpf } = request.query;
  const person = new Person(name, age, cpf);

  people.push(person);

  return response.json({ person });
});

//Exercicio 7

app.get('/show-person/:id', (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);

  const result = people.find((person) => intId === person.id);

  return response.json({ result });
});

//Exercicio 8

app.get('/show-people', (request, response) => {
  return response.json({ people });
});

//Exercicio 9

app.get('/remove-person', (request, response) => {
  const { id } = request.query;
  const intId = parseInt(id);
  people = people.filter((person) => intId !== person.id);

  return response.json({ people });
});

//Exercicio 10

const names = [];
app.get('/reverse-people-names', (request, response) => {
  people.forEach((person) => person.reverseName());

  return response.json({ people });
});

//Método POST

//Exercicio 11

app.post('/add-person', (request, response) => {
  const { name, age, cpf } = request.body;

  const searchCpf = people.findIndex((person) => person.cpf === cpf);

  if (searchCpf >= 0) {
    return response.status(409).json({ message: 'User already exist' });
  } else {
    const person = new Person(name, age, cpf);
    people.push(person);
    return response.json({ person });
  }
});

//Exercicio 12
const arrTeam = [];
app.post('/add-team', (request, response) => {
  const { name, year, state } = request.body;
  if (!name || !year || !state) {
    return response.status(404).json({ error: 'Please, fill all fields' });
  }
  const newTeam = new Team(name, year, state);
  arrTeam.push(newTeam);
  console.log(newTeam);
  return response.json({ newTeam });
});

//Exercicio 13

app.post('/add-calc-value', (request, response) => {
  const { ...numbers } = request.query;
  //  const { ...numbers } = request.body;// NÃO SABIA SE ERA POR QUERY OU BODY
  const arrNumbers = numbers.number;
  let pairNumbers = 0;
  let oddNumbers = 0;
  for (const index in arrNumbers) {
    arrNumbers[index] = parseInt(arrNumbers[index]);
    console.log(arrNumbers[index]);
    if (isNaN(arrNumbers[index])) {
      return response.status(406).json({ error: 'This value is not a number' });
    }
    if (arrNumbers[index] % 2 == 0) {
      pairNumbers++;
    } else {
      oddNumbers++;
    }
  }

  const newArr = arrNumbers
    .filter((number) => (number + '').indexOf('2') < 0)
    .filter((number) => (number + '').indexOf('4') < 0);
  const result = newArr.reduce((total, next) => {
    return total + next;
  });

  return response.json({ pairNumbers, oddNumbers, result });
});

//Exercicio 14

const arrMiles = [];
app.post('/register-miles', (request, response) => {
  let { id, miles, date } = request.body;
  var verifyDate = /\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!verifyDate.test(date)) {
    return response.status(406).json({ error: 'Formato inválido' });
  }
  // const searchId = arrMiles.findIndex((person) => person.id === id);
  // if (searchId) {
  //   arrMiles[searchId].miles += miles;
  // } else {
  if (!date.includes('2020')) {
    miles = 0;
  }
  const milesUser = new MilesRegister(id, miles, date);
  arrMiles.push(milesUser);
  // }
  if (miles % 120000 == 0 && miles != 0) {
    return response.json({
      message: 'Usuário já tem troca de pontos disponíveis',
      milesUser,
    });
  }
  return response.json({
    message: 'Usuário não tem troca de pontos disponíveis',
  });
});

//Exercicio 15

app.post('/register-attempts', (request, response) => {
  const { numberAttempts, numberHits } = request.body;
  let percentage = (numberHits / numberAttempts) * 100;

  switch (true) {
    case percentage < 0:
      return response.status(406).json({
        error: 'Impossível ter acertos ou tentativas negativos',
      });
    case percentage < 41:
      return response.json({
        message: 'Entre 0 e 40%: Você precisa melhorar.',
      });
    case percentage < 61:
      return response.json({
        message: 'Entre 40% e 60%: Muito bom, mas ainda pode ser melhor.',
      });
    case percentage < 91:
      return response.json({
        message:
          'Entre 60% e 90%: Parabéns, seu aproveitamento é acima da média',
      });
    case percentage < 100:
      return response.json({
        message: 'Entre 90% e 99%: Parabéns, você está entre os melhores',
      });
    case percentage == 100:
      return response.json({
        message: '100%: Parabéns, você é O MELHOR',
      });
    default:
      return response.status(406).json({
        error: 'Impossível ter mais acertos que tentativas',
      });
  }
});

//PUT

//Exercicio 16

app.put('/add-person/:id', (request, response) => {
  const { id } = request.params;
  const { name, age, cpf } = request.body;

  if (!name || !age || !cpf) {
    return response.status(409).json({ message: 'Please, fill all fields' });
  }

  const intId = parseInt(id);
  const searchId = people.findIndex((person) => person.id === intId);
  if (searchId < 0) {
    return response.status(409).json({ message: 'User not exist' });
  } else {
    people[searchId].name = name;
    people[searchId].age = age;
    people[searchId].cpf = cpf;
  }

  const newPerson = people[searchId];
  return response.json({ newPerson });
});

//Exercicio 17

app.put('/add-team/:id', (request, response) => {
  const { id } = request.params;
  const { name, state, year } = request.body;

  const intId = parseInt(id);
  const searchId = arrTeam.findIndex((team) => team.id === intId);
  if (searchId < 0) {
    return response.status(409).json({ message: 'Team not exist' });
  } else {
    arrTeam[searchId].reverseName(name);
  }
  const newTeam = arrTeam[searchId];
  return response.json({ newTeam });
});

//DELETE

// Exercicio 18

app.delete('/remove-person/:id', (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);
  const searchId = people.findIndex((person) => person.id === intId);
  console.log(searchId);
  if (searchId < 0) {
    return response.status(404).json({ message: 'User not exist' });
  }
  people = people.filter((person) => person.id !== intId);

  return response.json({ people });
});

// Exercicio 19

const arrClass = [];
const student = new Student('rafael', 'rafael@growdev.com');
const student1 = new Student('maito', 'maito@growdev.com');
const javaScript = new Classs('JavaScript');
const python = new Classs('python');

arrClass.push(javaScript);
arrClass.push(python);

javaScript.addStudent(student);
javaScript.addStudent(student1);

app.delete('/remove-class/:id', (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);
  const searchId = arrClass.findIndex((classs) => classs.id === intId);
  console.log(searchId);
  if (searchId < 0) {
    return response.status(404).json({ message: 'Class not exist' });
  }

  if (arrClass[searchId].students.length !== 0) {
    return response.status(404).json({
      error: 'This class has students, you can not remove.',
    });
  }

  arrClass.splice(searchId, 1);
  response.json(arrClass);
});

app.delete('/remove-student-class/:name', (request, response) => {
  const { name } = request.params;

  for (const indexClass in arrClass) {
    if (arrClass[indexClass].name === name) {
      arrClass.splice(indexClass, 1);
      return response.status(200).json({
        message: `The class ${name} was removed`,
      });
    }
    for (const indexStudents in arrClass[indexClass].students) {
      if (arrClass[indexClass].students[indexStudents].name === name) {
        arrClass[indexClass].students.splice(indexStudents, 1);
        return response.status(200).json({
          message: `The student ${name} was removed of class ${arrClass[indexClass].name}`,
        });
      }
    }
  }

  return response.status(404).json({ error: 'The class or student not found' });
});

app.listen(3333);

//desenvolvido por Rafael Maito
