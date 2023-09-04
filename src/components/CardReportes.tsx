import React from 'react';
import { Card } from 'react-native-paper';
import { Text, Image } from 'react-native';
import styles from './styles/homeStyles';

const ReportCard = ({ report }) => (
  <Card key={report._id} style={styles.card}>
    <Card.Content>
      <Text style={styles.reportTitle}>{report.title}</Text>
      <Text style={styles.reportDescription}>Descripción: {report.description}</Text>
      <Text style={styles.reportLocation}>Ubicación: {report.ubication}</Text>
      <Image source={{ uri: report.img }} style={styles.reportImage} />
    </Card.Content>
  </Card>
);

export default ReportCard;
