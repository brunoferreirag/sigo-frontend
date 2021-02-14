// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wsLogin:'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/usuarios/login',
  wsListarUsuarios:'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/usuarios',
  wsListarFuncoes:'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/usuarios/funcoes',
  wsListarArmazem: 'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/logistica/armazens',
  wsBuscarNormasIndustriais:'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/gestao-norma-industrial/norma-industrial/busca',
  wsNormasIndustriaisBusca:'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/gestao-norma-industrial/norma-industrial/busca',
  wsNormasIndustriais:'https://sigo-gateway-brunoferreirag.cloud.okteto.net/api/gestao-norma-industrial/norma-industrial'
  };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
