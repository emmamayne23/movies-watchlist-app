import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { getMovieDetails, getMovieTrailer } from '@/services/movieService';

const MovieDetailsScreen = () => {
  const params = useLocalSearchParams()
  const { id } = params;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailerKey, setTrailerKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [details, trailer] = await Promise.all([
            getMovieDetails(Number(id)),
            getMovieTrailer(Number(id))
          ]);
        setMovie(details);
        setTrailerKey(trailer?.key || '');
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if(!movie) return null;

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop Image with Gradient */}
      <View style={styles.backdropContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` }}
          style={styles.backdrop}
        />
      </View>

      {/* Movie Poster and Basic Info */}
      <View style={styles.header}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.meta}>
            {movie.release_date.split('-')[0]} • {movie.runtime} min
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}/10</Text>
          </View>
          <View style={styles.genreContainer}>
            {movie.genres.map(genre => (
              <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="bookmark" size={24} color="#fff" />
          <Text style={styles.actionText}>Watchlist</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="heart" size={24} color="#fff" />
          <Text style={styles.actionText}>Favorite</Text>
        </TouchableOpacity>

        {trailerKey && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${trailerKey}`)}
          >
            <Ionicons name="play-circle" size={24} color="#fff" />
            <Text style={styles.actionText}>Trailer</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>

      {/* Additional Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{movie.status}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Budget:</Text>
          <Text style={styles.detailValue}>
            ${movie.budget.toLocaleString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  backdropContainer: {
    height: 250,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    marginTop: -100,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meta: {
    color: '#aaa',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    color: 'white',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    color: '#ddd',
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#aaa',
    width: 80,
  },
  detailValue: {
    color: 'white',
    flex: 1,
  },
});

export default MovieDetailsScreen;