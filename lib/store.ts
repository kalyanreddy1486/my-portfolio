export type St = { on: boolean; paused: boolean; built: boolean; touring: boolean };

const init: St = { on: false, paused: false, built: false, touring: false };
let st = init;
const subs = new Set<() => void>();

export const get = () => st;
export const getServer = () => init;

export const set = (p: Partial<St>) => {
  st = { ...st, ...p };
  subs.forEach((f) => f());
};

export const sub = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
