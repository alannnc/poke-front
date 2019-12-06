import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          instructionsOne: "Select 2 pokemons to battle!",
          actions: "Actions",
          scrollDownInstructions: "Scroll down to browse more pokemons!",
          errorOnApi: "Couldn't connect with API SERVICE:"
        }
      },
      es: {
        translations: {
          instructionsOne: "Selecciona dos pokemones para luchar!",
          actions: "Acciones",
          scrollDownInstructions:
            "Desplazate hacia abajo para ver mas pokemones!",
          errorOnApi: "No se pudo conectar al servicio de API"
        }
      }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
