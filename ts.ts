const numero: number = 10
const letras: string = "10"
const verdadero: boolean = true

let numero2 = 15
let letras2 = "15"
let verdadero2 = true

numero2 = 30
//numero2 = "letras"

verdadero2 = false
//verdadero2 = "false"

type stringOrNumber = string | number
type stringOrBoolean = string | boolean
type arrayOfNumbers = number[]

let puedeSer2tipos: stringOrNumber = "empieza como string"
puedeSer2tipos = 100
puedeSer2tipos = "lo cambie por string"
puedeSer2tipos = 200
//puedeSer2tipos = true

let puedeSer3tipos: stringOrNumber | boolean = true
puedeSer3tipos = 20
puedeSer3tipos = "cadena de texto"
//puedeSer3tipos = null

interface Persona {
  _id?: string
  nombre: string
  edad: number
  hijos?: boolean
}
let persona1: Persona = { nombre: "Igna", edad: 34 }
let persona2: Persona = { nombre: "Igna", edad: 34, hijos: false }
//let persona3: Persona = { nombre: "Igna", edad: 34, mascotas: false }

const array1: string[] = ["hola", "chau", "buenos dias"]
const array2: arrayOfNumbers = [1, 2, 3 , 4, 5 ,6]
const array3: Array<boolean> = [true, false, true, true]
const array4: Array<stringOrBoolean> = ["true", true, true, false, false, "10"]

function sumarNumeros(n1: number, n2: number, n3: number): number {
  return n1+n2+n3
}
const sumarNumerosYdevolverString = (n1: number, n2: number, n3: number): string => {
  const suma: number = n1+n2+n3
  return "la suma de los numeros es: "+suma
}