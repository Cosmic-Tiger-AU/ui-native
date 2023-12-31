import React, {
  ComponentType,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
} from "react";
import { ColorTypes, WeightTypes } from "~/types/cosmic-styles";
import { translateCosmicStyles } from "~/util/translator";
import { CosmicStyles, CosmicTheme } from "..";

export type CosmicProps<P> = P & {
  cs?: CosmicStyles;
  color?: ColorTypes;
  weight?: WeightTypes;
};

export const getColor = (theme: CosmicTheme, color: string) => {
  switch (color) {
    case "primary":
      return theme.colors.primary;
    case "secondary":
      return theme.colors.secondary;
    case "background":
      return theme.colors.background;
    case "light":
      return theme.colors.light;
    case "textPrimary":
      return theme.colors.textPrimary;
    case "textSecondary":
      return theme.colors.textSecondary;
    default:
      return color || "purple";
  }
};

export const getFont = (theme: CosmicTheme, weight: string) => {
  switch (weight) {
    case "light":
      return theme.fonts.light;
    case "regular":
      return theme.fonts.regular;
    case "bold":
      return theme.fonts.bold;
    default:
      return theme.fonts.regular || "sans-serif";
  }
};

export const getWeight = (theme: CosmicTheme, weight: string): number => {
  switch (weight) {
    case "light":
      return 300;
    case "regular":
      return 400;
    case "bold":
      return 700;
    default:
      return 400;
  }
};

const withCs = <P extends { style?: any }>(
  Component: ComponentType<P>,
): React.ForwardRefExoticComponent<
  PropsWithoutRef<CosmicProps<P>> & RefAttributes<any>
> => {
  return forwardRef((props: CosmicProps<P>, ref: React.Ref<any>) => {
    const { cs, style, ...rest } = props;
    const smashedStyles = cs ? translateCosmicStyles(cs) : {};

    return (
      <Component {...(rest as P)} style={[style, smashedStyles]} ref={ref} />
    );
  });
};

export default withCs;
