import React, { Component } from 'react'
import { Animated, Easing, StyleSheet, View, Image } from 'react-native'
import Swiper from 'react-native-deck-swiper'

// Import your image assets
import LikeImage from './check.png'
import NopeImage from './cross.png'

const COLORS = ['#92CDF3', '#80E7BA', '#FCD689', '#CF885F', '#C35B61'];

interface Card {
  color: string;
  id: number;
}

interface State {
  cards: Card[];
  swipedAllCards: boolean;
  cardIndex: number;
  glowAnim: Animated.Value;
}

export default class Example extends Component<{}, State> {
  swiper: Swiper<Card> | null;
  constructor(props: {}) {
    super(props)
    this.state = {
      cards: COLORS.map((color, index) => ({ color, id: index })),
      swipedAllCards: false,
      cardIndex: 0,
      glowAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.glowAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.glowAnim, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }

  renderCard = (card: Card) => {
    return (
      <View style={[styles.card, { backgroundColor: card.color }]} />
    )
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          backgroundColor='white'
          ref={swiper => {
            this.swiper = swiper
          }}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={22}
          animateCardOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              element: <Animated.Image source={NopeImage} style={{ width: 100, height: 100, opacity: this.state.glowAnim }} />, // Use your Nope image here
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -30
                }
              }
            },
            right: {
              element: <Animated.Image source={LikeImage} style={{ width: 100, height: 100, opacity: this.state.glowAnim }} />, // Use your Like image here
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 30
                }
              }
            }
          }}
        >
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flex: 0.9,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
