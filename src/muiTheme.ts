import { createTheme } from "@mui/material";

// Augment the palette to include a indigo color
declare module '@mui/material/styles' {
    interface Palette {
        indigo: Palette['primary'];
    }

    interface PaletteOptions {
        indigo?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include a indigo option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        indigo: true;
    }
}

export const theme = createTheme({
    palette: {
        indigo: {
            main: '#4f46e5',
            light: '#6366f1',
            dark: '#3730a3',
            contrastText: '#ffffff',
        },
    },
});
