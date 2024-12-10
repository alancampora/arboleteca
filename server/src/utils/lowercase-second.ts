export default function lowercaseSecondWord(input:string) {
  const words = input.split(' '); // Divide el string en palabras
  if (words.length > 1) {
    words[1] = words[1].charAt(0).toLowerCase() + words[1].slice(1); // Convierte la primera letra de la segunda palabra a minúscula
  }
  return words.join(' '); // Une las palabras de nuevo en un string
}
