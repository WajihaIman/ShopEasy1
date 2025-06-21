import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Smart Watch',
    price: 150,
    category: 'Electronics',
    description: 'A smart watch with health tracking.',
    image: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 99,
    category: 'Audio',
    description: 'Noise cancelling Bluetooth earbuds.',
    image: 'https://picsum.photos/200/300?random=2',
  },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState({});

  const handleReviewSubmit = () => {
    setReviews({
      ...reviews,
      [selectedProduct.id]: [...(reviews[selectedProduct.id] || []), comment],
    });
    setComment('');
  };

  if (selectedProduct) {
    return (
      <ScrollView style={{ padding: 10 }}>
        <Image source={{ uri: selectedProduct.image }} style={{ height: 200, borderRadius: 10 }} />
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{selectedProduct.name}</Text>
        <Text>${selectedProduct.price}</Text>
        <Text>{selectedProduct.description}</Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Write a Review:</Text>
          <TextInput
            placeholder="Your comment"
            value={comment}
            onChangeText={setComment}
            style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
          />
          <Button title="Submit Review" onPress={handleReviewSubmit} />
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Reviews:</Text>
        {(reviews[selectedProduct.id] || []).map((r, i) => (
          <Text key={i}>• {r}</Text>
        ))}

        <Button title="⬅ Back" onPress={() => setSelectedProduct(null)} />
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>🛍️ ShopEasy</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedProduct(item)} style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 10 }}>
            <Image source={{ uri: item.image }} style={{ height: 150, borderRadius: 10 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
            <Text>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

