/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  Pressable,
} from 'react-native';

import tiktaktoe from './tiktaktoe'

function App({children}: PropsWithChildren<{}>) {
  const {width, height} = Dimensions.get('window');

  const screen_padding = 20
  const board_size = 1060
  const edge_length = Math.min(width, height) - (screen_padding * 2)

  const style = {
    background: {
      backgroundColor: '#cccccc',
      width: '100%', height: '100%',
    },

    board: {
      position: 'absolute',
      top: (height - edge_length) / 2, left: (width - edge_length) / 2,
      width: edge_length, height: edge_length,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',

    },

    boardImage: {
      width: '100%', height: '100%',
      position: 'absolute',
    },

    tak: {
      width: '33%', height: '33%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    taktak: {
      width: '60%', height: '60%',
    },

    gamestate: {
      position: 'absolute',
      top: edge_length + (height - edge_length) / 2 + 20,
      left: (width - edge_length) / 2,
    }
  }
  
  const tak_click = (t: number) => {
    if (game_state != 'playing') { return }
    if (board_state[t] != 0) { return } // already taken

    const new_board_state =  tiktaktoe.nextmove(board_state, t)

    console.log('new_board_state', new_board_state)
    set_board_state(new_board_state)


    if (tiktaktoe.check_win(new_board_state)) {
      set_game_state('O wins')
    } else if (tiktaktoe.check_draw(new_board_state)) {
      set_game_state('draw')
    } else {
      set_game_state('playing')
    }
  }

  const [ board_state, set_board_state ] = React.useState(tiktaktoe.initial_board_state)

  const [ game_state, set_game_state ] = React.useState('playing')

  return (
      <View style={style.background}>
        <Text style={style.gamestate}>Game State: {game_state}</Text>
        <View style={style.board}>
          <Image style={style.boardImage} source={require('./tiktaktoe.png')} />
          { board_state.map((v, i) => (
            <Pressable key={i} style={style.tak} onPress={() => tak_click(i)}>
              <Text>{i}</Text>
              {board_state[i] == 1 ? 
                <Image style={style.taktak} source={require('./x1.png')} /> : null}
              {board_state[i] == 2 ? 
                <Image style={style.taktak} source={require( './o1.png')} /> : null}
            </Pressable>
          ))}
        </View>

          <Pressable
            style={{
              position: 'absolute',
              top: edge_length + (height - edge_length) / 2 + 60,
              left: (width - edge_length) / 2,
              padding: 10,
              backgroundColor: '#007bff',
              borderRadius: 5,
            }}
            onPress={() => {
              set_board_state(tiktaktoe.initial_board_state);
              set_game_state('playing');
            }}
          >
            <Text style={{ color: '#ffffff' }}>Restart Game</Text>
          </Pressable>
        <View style={{ position: 'absolute', top: 44}}>
          <Text>Tik Tak Toe by Lee Irvine</Text>
          <Text>lee@kezzi.co</Text>          
        </View>

      </View>
  );
}

export default App;
