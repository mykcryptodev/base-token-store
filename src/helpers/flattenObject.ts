/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Recursive function to extract values from an object
export const flattenObject = (obj: any): any[] => {
  const values: unknown[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        values.push(flattenObject(obj[key]));
      } else if (Array.isArray(obj[key])) {
        const arrayValues: any[] = [];
        obj[key].forEach((item: any) => {
          if (typeof item === 'object') {
            arrayValues.push(flattenObject(item));
          } else {
            if (typeof item === 'number' || (typeof item === 'string' && !isNaN(Number(item)))) {
              arrayValues.push(BigInt(item));
            } else {
              arrayValues.push(item);
            }
          }
        });
        values.push(arrayValues);
      } else {
        if (typeof obj[key] === 'number' || (typeof obj[key] === 'string' && !obj[key].startsWith('0x') && !isNaN(Number(obj[key])))) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          values.push(BigInt(obj[key]));
        } else {
          values.push(obj[key]);
        }
      }
    }
  }
  return values;
};