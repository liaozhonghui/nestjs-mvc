import { customAlphabet } from 'nanoid';
// 36 bit alphabet.
const nanoidWithAlphabet = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  16,
);
// ~10 thousands of years of work are needed in order to have a 1% probability of at least one collision.
export function nanoidId() {
  return nanoidWithAlphabet();
}
