

# [ERC (Economic RESTful Client)](https://zhnzhn.github.io)
ERC (Economic RESTful Client) es una aplicación web que permite explorar, visualizar y combinar datos económicos y financieros, principalmente para gráficos, a partir de proveedores de datos abiertos y privados. Algunos ejemplos de visualización de datos y noticias sobre la aplicación web ERC se pueden encontrar en la página de Twitter [@webapperc](https://twitter.com/webapperc).   

Proveedores de datos: [DBnomics](https://db.nomics.world), [Eurostat](http://ec.europa.eu/eurostat/web/main/home), [UnComtrade](https://comtrade.un.org), [FAOSTAT](http://www.fao.org/faostat/en/#data/), [World Bank](https://data.worldbank.org/), [Statistics Norway](http://www.ssb.no/en), [Statistics Sweden](https://www.scb.se/en), [Insee: France Statistics](https://www.insee.fr/en/accueil), [Nasdaq Data Link](https://data.nasdaq.com), [Alpha Vantage](https://www.alphavantage.co) y más (Todos 49).   

![alt text](screencast/erc-currency-example.png?raw=true "Currency History")

**1.** **Por favor, seleccione un origen de datos temático (Navegador) en la barra superior.**  
**2.** **A continuación, seleccione un elemento del menú del conjunto de datos en el Navegador abierto.**   
**3.** **Seleccione los parámetros e ingrese la fecha de consulta en el Diálogo emergente y arrastrable.**   
**4.** **Haga clic en el botón Cargar.**   

**El resultado se visualizará en un gráfico dentro de un contenedor de gráficos redimensionable.**  
**También es posible exportar el gráfico a PNG, JPG, SVG e imprimir a PDF.**  

Al hacer clic en el **botón Mostrar** en un **Diálogo**, se abrirá un **contenedor de gráficos** con gráficos o vacío.   
Después de cerrar un **contenedor de gráficos**, todos los gráficos permanecen. Al mismo tiempo, se pueden abrir un máximo de tres **Diálogos**.

Algunos proveedores de datos abiertos y privados requieren una clave API del usuario.   

Las claves API de los proveedores de datos se pueden configurar en la **pestaña ApiKeys, diálogo Ajustes**. Para cargar datos de proveedores de datos donde se requiera un servidor proxy HTTP local para evitar CORS, este podría configurarse en el **diálogo Ajustes**.  

Hay tres temas de IU en la aplicación web ERC: **Oscuro**, **Claro** y **Arena**, que se pueden configurar en la **pestaña Opciones, diálogo Ajustes**. Toda la configuración del usuario se guarda en la memoria del navegador solo para la sesión web actual.  

Puede encontrar más detalles y requisitos sobre los proveedores de datos en la **pestaña Acerca de** de la [aplicación web ERC](https://zhnzhn.github.io) y en los sitios web de los proveedores. Para más información sobre los datos, consulte la **pestaña Información del elemento del gráfico**.  

### Atención
Para cada elemento del **Diálogo**, solo puede haber un **elemento de gráfico** en un contenedor.

## Licencia
Este proyecto está licenciado bajo la [Licencia BSD de 3 Cláusulas](http://opensource.org/licenses/BSD-3-Clause). Copyright (c) 2016-presente, Yevhenii Molodyi.
