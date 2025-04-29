import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { getPopularMovies, searchMovies } from '@/services/movieService';

const MovieList = ({ navigation }: { navigation: any }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch initial movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getPopularMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = searchQuery.trim() === '' 
        ? await getPopularMovies() 
        : await searchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies().then(() => setRefreshing(false));
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity 
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
        <Text style={styles.year}>{item.release_date?.split('-')[0]}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && movies.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchMovies}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
      />

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor="#fff"
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No movies found</Text>
        }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: '#1f1f1f',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    margin: 10,
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  movieCard: {
    width: '48%',
    marginBottom: 15,
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
  },
  infoContainer: {
    padding: 5,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
  rating: {
    color: '#FFD700',
    fontSize: 12,
  },
  year: {
    color: '#888',
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },
  errorText: {
    color: 'white',
    marginBottom: 10,
  },
  retryText: {
    color: '#1E90FF',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MovieList;



// import { useState } from "react";
// import { View, TextInput, Button, FlatList, Text, Image, StyleSheet } from "react-native";
// import { searchMovies } from "@/services/movieService";

// export default function SearchScreen() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     const movies = await searchMovies(query);
//     setResults(movies);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Search movies..."
//         value={query}
//         onChangeText={setQuery}
//         style={styles.input}
//       />
//       <Button title="Search" onPress={handleSearch} />
//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.movieItem}>
//             <Image
//               source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
//               style={styles.poster}
//             />
//             <Text style={styles.title}>{item.title}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   movieItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   poster: {
//     width: 60,
//     height: 90,
//     marginRight: 12,
//     borderRadius: 6,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     flexShrink: 1,
//   },
// });
