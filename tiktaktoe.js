const win_patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const tiktaktoe = {
    initial_board_state: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    nextmove: (old_board_state, t) => {
        const board_state = old_board_state.slice();
        console.log(board_state)
        board_state[t] = 1;
        // now O's turn
        if (board_state[4] == 0) {
        // always take the center square if available
            board_state[4] = 2;
        } else {
            // take the winning move if available
            for(let i=0; i<win_patterns.length; i++) {
                const pattern = win_patterns[i];
                const o_count = pattern.reduce((acc, v) => acc + (board_state[v] == 2 ? 1 : 0), 0);
                const empty_count = pattern.reduce((acc, v) => acc + (board_state[v] == 0 ? 1 : 0), 0);

                if (o_count == 2 && empty_count == 1) {
                    const empty_index = pattern.find(v => board_state[v] == 0);
                    board_state[empty_index] = 2;
                    return board_state;
                }
            }            
        // otherwise, block X from winning
            for (let i = 0; i < win_patterns.length; i++) {
                const pattern = win_patterns[i];
                const x_count = pattern.reduce((acc, v) => acc + (board_state[v] == 1 ? 1 : 0), 0);
                const empty_count = pattern.reduce((acc, v) => acc + (board_state[v] == 0 ? 1 : 0), 0);
                const open_index = pattern.find(v => board_state[v] == 0);
                console.log(open_index)

                // then place O in the empty space
                if (x_count == 2 && empty_count == 1) {
                    const empty_index = pattern.find(v => board_state[v] == 0);
                    board_state[empty_index] = 2;
                    return board_state;
                }
            }

            for (let i = 0; i < win_patterns.length; i++) {
                const pattern = win_patterns[i];
                const x_count = pattern.reduce((acc, v) => acc + (board_state[v] == 1 ? 1 : 0), 0);
                const empty_count = pattern.reduce((acc, v) => acc + (board_state[v] == 0 ? 1 : 0), 0);
                const open_index = pattern.find(v => board_state[v] == 0);
                console.log(open_index)

                // then place O in the empty space
                if (x_count == 1 && empty_count == 2) {
                    const empty_index = pattern.find(v => board_state[v] == 0);
                    board_state[empty_index] = 2;
                    return board_state;
                }
            }

        // otherwise, take the first available empty square
            for(let i=0; i<win_patterns.length; i++) {
                const pattern = win_patterns[i];
                const o_count = pattern.reduce((acc, v) => acc + (board_state[v] == 2 ? 1 : 0), 0);
                const empty_count = pattern.reduce((acc, v) => acc + (board_state[v] == 0 ? 1 : 0), 0);

                if (o_count > 1 && empty_count > 1) {
                    const empty_index = pattern.find(v => board_state[v] == 0);
                    board_state[empty_index] = 2;
                    return board_state;
                }
            }
        }

        return board_state;
    },

    check_win: (board_state) => {    
        return win_patterns.some(pattern => {
            return pattern.every(i => board_state[i] == 2)
        })
    },

    check_draw: (board_state) => {
        return board_state.every(v => v != 0)
    }


}

export default tiktaktoe;