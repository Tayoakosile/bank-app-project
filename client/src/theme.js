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
