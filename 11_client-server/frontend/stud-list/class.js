export default class Student {
  constructor(surname, name, lastname, birthday, faculty, studyStart, id) {
    this.id = id
    this.surname = surname
    this.name = name
    this.lastname = lastname
    this.birthday = birthday
    this.faculty = faculty
    this.studyStart = studyStart

  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  get birthDate() {
    let yyyy = this.birthday.getFullYear();
    let mm = this.birthday.getMonth() + 1;
    let dd = this.birthday.getDate();
    if(mm < 10) mm = '0' + mm;
    if(dd < 10) dd = '0' + dd;
    return yyyy + '.' + mm + '.' + dd
  }

  get age() {
    const today = new Date();
    let age = today.getFullYear() - this.birthday.getFullYear();
    let mm = today.getMonth() - this.birthday.getMonth();
    if (mm < 0 || (mm == 0 && today.getDate() < this.birthday.getDate())) {
      age--
    }
     return age;
  }

  get studyPeriod() {
    const currentTime = new Date();
    let nowMonth = currentTime.getMonth();
    let nowDate = currentTime.getDate();
    let courses = currentTime.getFullYear() - this.studyStart - (0 > (nowMonth - 8 || nowDate - 1));
    courses = ++courses > 4 ? 'Закончил' : `${courses} курс`;
    let range = `${this.studyStart} - ${+this.studyStart + 4} (${courses})`;
    return range;
  }
}





