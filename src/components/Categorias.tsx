import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Card, Button } from 'react-native-paper';
import axios from 'axios';
import styles from './styles/categoriasStyles.js';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCategorias = async () => {
    try {
      setIsRefreshing(true); // Indicar que la actualización está ocurriendo
      const response = await axios.get('https://fix-api.fly.dev/categorias');
      setCategorias(response.data);
      setIsRefreshing(false); // Finalizar la actualización
    } catch (error) {
      console.error(error);
      setIsRefreshing(false); // Finalizar la actualización incluso en caso de error
    }
  };

  const handleCategoryPress = (categoriaId) => {
    console.log(`Ver detalles de la categoría: ${categoriaId}`);
    // Aquí puedes implementar la navegación a la vista de detalles de la categoría
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchCategorias} />}>
      <Text style={styles.title}>Categorías</Text>
      {categorias.map((categoria) => (
        <Card key={categoria._id} style={styles.card}>
          <Card.Content>
            <Text style={styles.category}>
              {categoria.category}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleCategoryPress(categoria._id)}>Ver Categoría</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Categorias;