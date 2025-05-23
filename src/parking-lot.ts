interface Event {
  message: string;
}

interface Subscriber {
  update(event: Event): void;
}

interface Publisher {
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  notify(event: Event): void;
}

export class Display implements Subscriber {
  update(event: Event): void {
    console.log(event.message);
  }
}

export class ParkingLot implements Publisher {
  private subscribers: Subscriber[] = [];
  public occupied: number = 0;

  constructor(
    public name: string,
    public capacity: number
  ) {}

  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  notify(event: Event): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(event);
    }
  }

  enter() {
    if (!this.isFull()) {
      this.occupied++;
      this.notify({ message: `A car entered the lot ${this.name}: ${this.occupied}/${this.capacity} occupied.` });
    } else {
      throw new Error("the parking lot is full");
    }
  }

  exit() {
    if (!this.isEmpty()) {
      this.occupied--;
      this.notify({ message: `A car left the lot ${this.name}: ${this.occupied}/${this.capacity} occupied.` });
    } else {
      throw new Error("the parking lot is empty");
    }
  }

  isFull() {
    return this.occupied === this.capacity;
  }

  isEmpty() {
    return this.occupied === 0;
  }
}
