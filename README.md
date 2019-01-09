# Aprender i18n con react-intl 

## Descripción

En este ejemplo sencillo se verá una lista, un buscador y un panel de configuración básico. 
Desde el panel de configuración se puede elegir el idioma, inglés o español, utilizando la librería React-Intl. 

## ¿Qué es i18n? 

Se refiere a la palabra internationalization en inglés. El código se construye con la inicial de la palabra, 18 por las 18 letras que tiene, y luego la última letra.
La librería más utilizada para realizar esta tarea es react-intl, desarrollada por Yahoo. 
react-intl tiene un conjunto de componentes y una función que expone utilidades para realizar la traducción facilitada, manejo de fechas, intervalos de tiempo, números. Los componentes cumplen las mismas funcionalidades que la API basada en funciones, pero son recomendadas desde la documentación de la librería ya que tienen ventajas por adecuarse mejor al paradigma de desarrollo de React (basado en componentes) y mejoras de eficiencia, evitando renderizaciones adicionales cada vez que fuese posible. 

## Live Demo

Para poder acceder a una demo en ejecución de este ejemplo, se puede ingresar a la url:

https://codesandbox.io/s/github/correooke/react-intl-with-lang-generator

### Autor: Emiliano Ocariz


------------

Integración de babel-plugin-react-intl con CRA

https://github.com/facebook/create-react-app/issues/1227#issuecomment-296316167

$ yarn add react-intl-cra --dev
$ react-intl-cra './src/**/*.js' -o messages.json


Con babel-preset-react-app: npm install --save-dev babel-cli babel-preset-react-app babel-plugin-react-intl


"lang": ".\\node_modules\\.bin\\react-intl-cra ./src/**/*.js -o ./src/languages/es/messages.json"