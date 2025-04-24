/* desarrollar con TDD una funcion que sirva para sumar numeros */

/* con el desarrollo orientado a pruebas */
/* el primer paso es definir la función que necesito desarrollar VACIA */
const sumarNumeros = (...nums) => {
  if (nums.length === 0) {
    return 0;
  }
  const hayNoNumeros = nums.some((num) => typeof num !== "number");
  if (hayNoNumeros) {
    return null;
  }
  const sumatoria = nums.reduce((acc, val) => acc + val);
  return sumatoria;
};

/* el segundo paso es definir las pruebas que van a hacer funcionar la función */
// T1: devuelve null si algun numero no es numerico
const test1 = () => {
  const resultado = sumarNumeros(1, "casa");
  if (resultado === null) {
    console.log("TEST 1: ok");
  } else {
    console.log("TEST 1: no pasó");
  }
};
// T2: devuelve 0 si no recibe parámetros
const test2 = () => {
  const resultado = sumarNumeros();
  if (resultado === 0) {
    console.log("TEST 2: ok");
  } else {
    console.log("TEST 2: no pasó");
  }
};
// T3: devuelve correctamente la suma de dos numeros
const test3 = () => {
  const resultado = sumarNumeros(10, 5);
  if (resultado === 15) {
    console.log("TEST 3: ok");
  } else {
    console.log("TEST 3: no pasó");
  }
};
// T4: devuelve correctamente la suma de cualquier cantidad de numeros
const test4 = () => {
  const resultado = sumarNumeros(10, 100, 5000, 5);
  if (resultado === 5115) {
    console.log("TEST 4: ok");
  } else {
    console.log("TEST 4: no pasó");
  }
};

test1();
test2();
test3();
test4();
