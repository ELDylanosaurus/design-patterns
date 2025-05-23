import { ParkingLot, Display } from "./parking-lot.js";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1));

const fill = async (lot: ParkingLot) => {
  while (!lot.isFull()) {
    await sleep(rand(100, 1000));
    lot.enter();
  }
};

const empty = async (lot: ParkingLot) => {
  while (!lot.isEmpty()) {
    await sleep(rand(500, 2000));
    lot.exit();
  }
};

const lot = new ParkingLot("Bahnhof Parking", 100);
const display = new Display();
lot.subscribe(display);

await fill(lot);
await sleep(2000);
await empty(lot);
