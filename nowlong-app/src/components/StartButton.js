import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function StartButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
