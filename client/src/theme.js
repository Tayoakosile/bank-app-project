import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#cfdced78",
        100: "#cfdced",
        200: "#a0b8db",
        300: "#7095c9",
        400: "#4171b7",
        500: "#114ea5",
        600: "#0e3e84",
        700: "#0a2f63",
        800: "#071f42",
        900: "#031021",
      },
      second: {
        100: "#f9d6d2",
        200: "#f3aea5",
        300: "#ed8578",
        400: "#e75d4b",
        500: "#e1341e",
        600: "#b42a18",
        700: "#871f12",
        800: "#5a150c",
        900: "#2d0a06",
      },
      thirdColor: {
          100: "#d0e0f6",
          200: "#a2c1ed",
          300: "#73a2e5",
          400: "#4583dc",
          500: "#1664d3",
          600: "#1250a9",
          700: "#0d3c7f",
          800: "#092854",
          900: "#04142a"
},
    },
    fonts: {
      body: "Montserrat",
      heading: "Montserrat",
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button"],
  })
);
export default theme;
