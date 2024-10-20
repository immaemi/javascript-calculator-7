import { Console } from '@woowacourse/mission-utils';

class App {
  constructor() {
    this.delimiters = [',', ':'];
  }

  async readCustomDelimiters(str) {
    if (str[0] === '/' && str[1] === '/') {
      let endOfCustomDelimeters = 0;

      for (let i = 2; i < str.length; i += 1) {
        if (str[i] === '\\' && str[i + 1] === 'n') {
          endOfCustomDelimeters = i + 2;
          break;
        }

        this.delimiters.push(str[i]);
      }

      return str.slice(endOfCustomDelimeters, str.length);
    }

    return str;
  }

  async run() {
    let str = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    str = await this.readCustomDelimiters(str);

    let sum = 0;
    let numberTmp = '';

    for (let i = 0; i < str.length; i += 1) {
      if (this.delimiters.includes(str[i])) {
        sum += Number(numberTmp);
        numberTmp = '';
        continue;
      }

      numberTmp += str[i];
    }

    sum += Number(numberTmp);
    Console.print(`결과 : ${sum}`);
  }
}

export default App;