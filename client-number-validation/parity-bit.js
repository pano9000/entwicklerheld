export function validateClientNumber(clientNumber){
  const formatRegex = /^\d{10}$/;

  if (!formatRegex.test(clientNumber)) {
     return false;
  }

  // base2 aka binary
  const clientNumberAsBase2 = Number(clientNumber).toString(2);

  // count all "1"s in the string
  const parity = clientNumberAsBase2.split("").reduce( (accum, curr) => (curr == "1") ? ++accum : accum);

  return parity % 2 == 0;
}