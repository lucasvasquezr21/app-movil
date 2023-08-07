import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Card , Button} from 'react-native-paper';
import axios from 'axios';
import styles from './styles/categoriasStyles.js'

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://fix-api.fly.dev/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchCategorias();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    >
      <Text style={styles.title}>Categorías:</Text>
      {categorias.map((categoria) => (
        <Card key={categoria._id} style={styles.card}>
          <Card.Content>
            <Text style={styles.category}>{categoria.category}</Text>
          </Card.Content>
          <Card.Actions>
      <Button>Ver Categoria</Button>
    </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Categorias;
