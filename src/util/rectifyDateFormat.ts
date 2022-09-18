/*
 * rectifyDateFormat.ts
 * author: evan kirkiles
 * created on Wed Sep 07 2022
 * 2022 the nobot space,
 */
export default function rectifyDateFormat(s: string) {
  let b = s.split(/\D/);
  return (
    b[0] +
    '-' +
    b[1] +
    '-' +
    b[2] +
    'T' +
    b[3] +
    ':' +
    b[4] +
    ':' +
    b[5] +
    '.' +
    b[6].substr(0, 3) +
    '+00:00'
  );
}
