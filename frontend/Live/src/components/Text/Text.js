import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const H1 = ({ children, style }) => (
  <Text style={[styles.h1, style]}>{children}</Text>
);

export const H2 = ({ children, style }) => (
  <Text style={[styles.h2, style]}>{children}</Text>
);

export const H3 = ({ children, style }) => (
  <Text style={[styles.h3, style]}>{children}</Text>
);

export const P = ({ children, style }) => (
  <Text style={[styles.p, style]}>{children}</Text>
);

export const SubtleText = ({ children, style }) => (
  <Text style={[styles.subtleText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'regular',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'regular',
  },
  h3: {
    fontSize: 18,
    fontWeight: 'light',
  },
  p: {
    fontSize: 16,
  },
  subtleText: {
    fontSize: 14,
    color: 'gray',
  },
});