function mod(m: number, n: number) {
  return ((m % n) + n) % n;
}

function calculatePi(NDIGITS: number) {
  var LEN = (NDIGITS / 4 + 1) * 14,
    out = "",
    a = [],
    b = 0,
    c = LEN,
    d = 0,
    e = 0,
    f = 10000,
    g = 0,
    h = 0;

  for (; a.length !== LEN; a.push(0));
  for (; (b = c -= 14) > 0;) {
    for (; --b > 0;) {
      d *= b;
      if (h === 0) {
        d += 2000 * f;
      } else {
        d += a[b] * f;
      }
      g = b + b - 1;
      a[b] = mod(d, g);
      d = Math.floor(d / g);
    }
    h = Math.floor(e + d / f);
    out += h;
    h = h.toString().length;
    d = e = mod(d, f);
  }
  return out;
}

export default function calculatePiValue(callback: (x: string) => void) {
  let initial = 0;
  setInterval(() => {
    initial += 2;
    console.log(initial)
    callback(calculatePi(initial));
  }, 2000);
}
