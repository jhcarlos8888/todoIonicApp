# todoIonicApp
App que permite crear lista de tareas teniendo tres estados en el proceso (Por hacer, Realizándose y Terminado)

# Versiones de herramientas utilizadas

Node js : 18.5.0

Ionic: 6.1.9

capacitor: 4.7.0
# Instalacion y ejecucion servidor local de aplicacion

npm install

ionic serve 

# Instrucciones para generar APK Android


ionic build

npm i @capacitor/core

npm i -D @capacitor/cli

ionic integrations enable capacitor

npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar

npm i @capacitor/android @capacitor/ios

npx cap add android

npx cap add ios


npx cap sync


Debemos tener instalado android studio antes de ejecutar el siguiente comando


npx cap open android


Luego se abrira el programa android studio donde deberemos instalar los paquetes necesarios para que la app funcione en la mayoria de versiones. Para ello abriremos en el programa android studio la opcion de Fie/Settings/Apperance&Behavior/System Settings/Android SDK.
Ahora seleccionaremos todas las versiones de android donde queremos que nuestra APK funcione, por lo regular se eligen las versiones desde la 8 hasta la 12 y se presiona el boton Apply.

Ahora para generar el archivo APK nos dirigimos a la pestaña Build/Build Bundles-APKS/Build APK

Con esto se generara nuestra apk para Android


# Reconstruir APK con datos actualizados

No es necesario reinstalar los paquetes anteriores para generar una nueva APK, si queremos generar una nueva APK con los cambios realizados, solo se ejecutan los siguientes comandos


ionic build

npx cap sync

npx cap open android

Esto con el fin de refrescar los cambios que se hubiesen hecho anteriormente en el proyecto



