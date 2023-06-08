import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from './service/api';

export default function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Digite algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert("Ops, erro ao buscar");
      setInput('');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador CEP</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          value={input}
          onChangeText={setInput}
          placeholderTextColor="#f1f1f1"
        />

        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {Object.keys(cep).length > 0 && (
        <View style={styles.main}>
          <Text style={styles.mainText}>CEP: {cep.cep}</Text>
          <Text style={styles.mainText}>Rua: {cep.logradouro}</Text>
          <Text style={styles.mainText}>Complemento: {cep.complemento}</Text>
          <Text style={styles.mainText}>Cidade: {cep.localidade}</Text>
          <Text style={styles.mainText}>Bairro: {cep.bairro}</Text>
          <Text style={styles.mainText}>Estado: {cep.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 85,
    color: '#fff',
    marginBottom: 34,
    transform: [{ rotateX: '90deg' }],
    animationDuration: '2s',
  },
  containerInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    marginVertical: 34,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#fff',
    marginRight: 8,
  },
  buttonSearch: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transitionDuration: '0.5s',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: 500,
    borderRadius: 8,
  },
  mainText: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
