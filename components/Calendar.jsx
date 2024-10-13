import styles from '@/styles/calendar.module.css';

export default function Calendar({ props }) {
  const
    thDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    inputYear = Number(props[0]),
    inputMonth = Number(props[1]),
    inputDay = Number(props[2]),
    dateInput = new ExtendedDate(inputYear, inputMonth - 1, inputDay),
    dateOne = new Date(inputYear, inputMonth - 1, 1),
    trMonth = month(dateOne.getDay() - 1, dateInput.getDayCount());

  return <>
    <div className={styles.date}>{dateInput.sayDate()}</div>
    <table className={styles.calendarbody}>
      <thead className={styles.calendarhead}>
        <tr>{thDays.map(thEl => <th key={thEl + Math.random()}>{thEl}</th>)}</tr>
      </thead>
      <tbody>
        {trMonth.map(trEl => <tr key={trEl + Math.random()}>   {trEl.map(tdEl => <td key={tdEl + Math.random()}
          data-color={selectElem(tdEl, inputDay)}>{tdEl}</td>)} </tr>)}
      </tbody>
    </table>
  </>
}

//сдвиг дней в календаре
function month(startShift, days) {
  let
    arr = [];
  for (let m = 1 - startShift; m <= days; m += 7) {
    arr.push(week(m, days));
  }
  return arr;
}

function week(monday, days) {
  let str = [];
  for (let i = monday; i < monday + 7; i++) {
    let cell = String(i);
    if (i < 1) cell = '<';
    if (i > days) cell = '>';
    str.push(' ' + cell.padStart(2, '_'));
  }
  return str;
}


//выделение элемента
function selectElem(elem, elemInput) {
  let
    str = '';
  if (Number(elem.replace('_', '')) === elemInput) str = "red";

  // else str = "blue";
  return str;

}

class ExtendedDate extends Date {
  //метод для вывода даты (числа и месяца) текстом
  sayDate() {
    const
      months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      days = ['первое', 'второе', 'третье', 'четвертое', 'пятое', 'шестое', 'седьмое', 'восьмое', 'девятое', 'десятое', 'одиннадцатое',
        'двенадцатое', 'тринадцатое', 'четырнадцатое', 'пятнадцатое', 'шестнадцатое', 'семнадцатое', 'восемнадцатое', 'девятнадцатое',
        'двадцатое', 'двадцать первое', 'двадцать второе', 'двадцать третье', 'двадцать четвертое', 'двадцать пятое', 'двадцать шестое', 'двадцать седьмое',
        'двадцать восьмое', 'двадцать девятое', 'тридцатое', 'тридцать первое'];

    return `${days[this.getDate() - 1]} ${months[this.getMonth()]} ${this.getFullYear()}`;
  }

  //метод для проверки – это прошедшая дата или будущая
  isFuture() {
    if (Date.now() <= this) return true
    else return false;
  }

  //метод для проверки – високосный год или нет
  isLeapYear() {
    const
      year = this.getFullYear(),
      checkDayF = new Date(year + ',2,29'),
      checkDayM = new Date(year + ',3,1');
    if (checkDayF.getTime() === checkDayM.getTime()) return false
    else return true;
  }

  //метод для проверк кол-ва дней в месяце
  getDayCount() {
    let
      count = 0;
    const
      days31 = [0, 2, 4, 6, 7, 9, 11],
      days30 = [3, 5, 8, 10];
    if (days31.includes(this.getMonth())) { count = 31 }
    if (days30.includes(this.getMonth())) { count = 30 }
    if (this.getMonth() === 1) { this.isLeapYear() ? count = 29 : count = 28 }

    return count;
  }


}