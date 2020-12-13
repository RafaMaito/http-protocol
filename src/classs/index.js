class Classs {
  static ID_COUNTER = 1;
  constructor(name) {
    this.id = Classs.ID_COUNTER++;
    this.name = name;
    this.students = [];
  }
  addStudent(student) {
    this.students.push(student);
  }
}

export default Classs;
