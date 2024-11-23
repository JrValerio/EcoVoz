declare module '*.module.css' {
  /**
   * Objeto que contém as classes CSS do módulo CSS.
   * As chaves do objeto são os nomes das classes CSS, e os valores são as strings CSS geradas.
   */
  const classes: { [key: string]: string };
  export default classes;
}