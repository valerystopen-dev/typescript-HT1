// 1. Add typings/access modifiers to the fruitBasket constant
enum Fruit {
  BANANA = 'banana',
  ORANGE = 'orange',
  KIWI = 'kiwi',
  APPLE = 'apple'
}
type FruitBasket = {[key in Fruit]:number};
const fruitBasket:FruitBasket = {
  banana: 2,
  orange: 3,
  kiwi: 2,
  apple: 3
};

// 2. Add typings/access modifiers to the Person class
enum Gender{
  Male = 'male',
  Female = "female"
}
class Person {
  name: string;
  gender: Gender;
  age: number;
  likes: string [];
  constructor(name: string, gender: Gender, age: number, likes: string[]) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.likes = likes;
  }

  public introduce():string {
    const { name, gender, age, likes } :{name: string, gender: Gender, age: number, likes: string[]} = this;
    const goodLookingMap : Map<string, string> = new Map([['male', 'handsome'], ['female', 'cute']]);
    return `
      Hello, I'm ${name}, ${age} years old, I like: ${likes.join(', ')}. 
      As you can see, I'm quite ${goodLookingMap.get(gender)} too!
    `;
  }
}

const Dima = new Person('Dima', 'male', 22, ['video games', 'martial arts']);
console.log(Dima.introduce());

// 3. Add typings/access modifiers to MovieService class
type promiseResolve = string[] | [] | Error;
type errLog = {
  log(err: Error): void;
};
class MovieService <T extends errLog> {
  private logger: T;
  public constructor(logger:  T) {
    this.logger = logger;
  }
  public getMovies(): Promise<promiseResolve> {
    return new Promise((resolve: (value: promiseResolve) => void, reject: (value: promiseResolve) => void) => {
        throw new Error('error');
        resolve(['Jaws', 'Spider-Man']);
      } ).catch((err: Error): string[] => {
        this.logger.log(err);
        return [];
      }
    );
  }
}

class LoggerOne implements errLog{
  public log(err: Error): void {
    console.log('sending logs to log storage 1', err);
  }
}
class LoggerTwo implements errLog{
  public log(err: Error): void {
    console.log('sending logs to log storage 2', err);
  }
}

const movieService1:MovieService<errLog>= new MovieService<errLog>(new LoggerOne());
const movieService2:MovieService<errLog>= new MovieService<errLog>(new LoggerTwo());

movieService1.getMovies();
movieService2.getMovies()