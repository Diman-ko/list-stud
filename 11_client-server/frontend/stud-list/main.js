import Student from './class.js'
//  список студентов
let students = []
//   new Student('Петров', 'Игорь', 'Васильевич', new Date(1991, 2, 13), 'Химия', 2011,),
//   new Student('Похожев', 'Юлий', 'Степанович', new Date(1996, 4, 20), 'Физика', 2021,),
//   new Student('Похожева', 'Юлия', 'Степановна', new Date(1996, 4, 20), 'Физика', 2017,),
//   new Student('Шокин', 'Петр', 'Сергеевич', new Date(1990, 7, 12), 'Биохимия', 2022,),
//   new Student('Стуков', 'Илья', 'Олегович', new Date(1995, 3, 5), 'Химия', 2019,),
// ]
console.log(students);
// =====================================================================
const SERVER_URL = `http://localhost:3000`;

async function serverAddStudent(obj) {
  let response = await fetch(SERVER_URL + `/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  let data = await response.json();
  return data;
}

// console.log(await serverAddStudent({name: 'name',
// surname: 'surname',
// lastname: 'lastname',
// studyStart: 'studyStart',
// birthday: '1990-01-01',
// faculty: 'faculty',}));

async function serverGetStudent() {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  let data = await response.json();
  return data;
}

// console.log(await serverGetStudent());
let serverData = await serverGetStudent();
if (serverData) {
  for (const item of serverData) {
    students.push(new Student(item.surname, item.name, item.lastname, item.birthday, item.faculty, item.studyStart, item.id))
  }
  // students = serverData;
}
// console.log(students);

const $studentList = document.getElementById('stud-list');
const $studentListThAll = document.querySelectorAll('.table-th th');

let column = 'fio',
  columnDir = true;

function $newStudentTr(student) {
  const $studentTr = document.createElement('tr'),
    $fioTd = document.createElement('td'),
    $birthdayTd = document.createElement('td'),
    $facultyTd = document.createElement('td'),
    $studyStartTd = document.createElement('td')

  $fioTd.textContent = student.fio;
  $birthdayTd.textContent = student.birthDate + ' (' + student.age + ' лет)';
  $facultyTd.textContent = student.faculty;
  $studyStartTd.textContent = student.studyPeriod;

  $studentTr.append($fioTd);
  $studentTr.append($birthdayTd);
  $studentTr.append($facultyTd);
  $studentTr.append($studyStartTd);

  return $studentTr;
}

// сортировка массива по параметрам
function getSortStudents(prop, dir) {
  let studentsCopy = [...students];
  return studentsCopy.sort(function (student1, student2) {
    if ((!dir == false ? student1[prop] < student2[prop] : student1[prop] > student2[prop]))
      return -1;
  })
}

// Фильтрация таблицы
function filter(arr, prop, value) {
  let arrCopy = [...arr],
    result = [];
  for (const item of arrCopy) {
    if (String(item[prop]).toLowerCase().includes(value) == true) result.push(item)
  }
  return result
}

// Отрисовка таблицы
function render() {
  let studentsCopy = [...students];
  studentsCopy = getSortStudents(column, columnDir);
  $studentList.innerHTML = '';
  // console.log(studentsCopy)

  const surnameValue = document.getElementById('surname-filter').value.toLowerCase().trim(),
    nameValue = document.getElementById('name-filter').value.toLowerCase().trim(),
    lastnameValue = document.getElementById('lastname-filter').value.toLowerCase().trim(),
    facultyValue = document.getElementById('faculty-filter').value.toLowerCase().trim(),
    birthdayValue = document.getElementById('birthday-filter').value,
    studyStartValue = document.getElementById('studyStart-filter').value

  if (surnameValue !== '') {
    $studentList.innerHTML = '';
    studentsCopy = filter(studentsCopy, 'surname', surnameValue)
  }

  if (nameValue !== '') {
    $studentList.innerHTML = '';
    studentsCopy = filter(studentsCopy, 'name', nameValue)
  }

  if (lastnameValue !== '') {
    $studentList.innerHTML = '';
    studentsCopy = filter(studentsCopy, 'lastname', lastnameValue)
  }

  if (facultyValue !== '') {
    $studentList.innerHTML = '';
    studentsCopy = filter(studentsCopy, 'faculty', facultyValue)
  }
  // if (nameValue !== '') studentsCopy = filter(studentsCopy, 'name', nameValue)
  // if (patronymicValue !== '') studentsCopy = filter(studentsCopy, 'lastname',patronymicValue)
  // if (facultyValue !== '') studentsCopy = filter(studentsCopy, 'faculty', facultyValue)
  if (birthdayValue !== '') {
    studentsCopy = filter(studentsCopy, 'birthday', birthdayValue)
  }
  if (studyStartValue !== '') {
    studentsCopy = filter(studentsCopy, 'studyStart', studyStartValue)
  }
  // console.log(studentsCopy)

  for (const elem of studentsCopy) {
    $studentList.append($newStudentTr(elem))
  }
}

$studentListThAll.forEach(elem => {
  elem.addEventListener('click', function () {
    // console.log('click')
    column = this.dataset.column;
    columnDir = !columnDir;
    console.log(column)
    render()
  })
})

document.getElementById('add-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  let newStudent = new Student(
    document.getElementById('surname-inp').value.trim(),
    document.getElementById('name-inp').value.trim(),
    document.getElementById('lastname-inp').value.trim(),
    new Date(document.getElementById('birthday-inp').value),
    document.getElementById('faculty-inp').value.trim(),
    Number(document.getElementById('studyStart-inp').value),
  )

  let serverDataObj = await serverAddStudent(newStudent);
  serverDataObj.birthday = new Date(serverDataObj.birthday)

  // students.push(newStudent)
  console.log(students);
  render()
  document.getElementById('surname-inp').value = '';
  document.getElementById('name-inp').value = '';
  document.getElementById('lastname-inp').value = '';
  document.getElementById('faculty-inp').value = '';
})

document.getElementById('filter-form').addEventListener('input', function (e) {
  e.preventDefault();
  render(students)
})

render()










