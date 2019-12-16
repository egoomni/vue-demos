import Vue from 'vue'
import Vuex from 'vuex'

import sudokuModule from '@/api/sudoku.js';

Vue.use(Vuex);

/*
difficulty: easy,medium,hard,very-hard,insane,inhuman
*/

export default new Vuex.Store({
  state: {
    grid: null,
    origString:null,
    difficulty:'hard'
  },
  mutations: {
    initGrid(state) {
      state.origString = sudokuModule.sudoku.generate(state.difficulty);
      console.log('original string', state.origString);

      let candidates = sudokuModule.sudoku.get_candidates(state.origString)
      state.grid = sudokuModule.sudoku.board_string_to_grid(state.origString);

      // change . to "", also store a ob instead of just numbers
      for(let i=0;i<state.grid.length;i++) {
        for(let x=0;x<state.grid[i].length;x++) {

          let newVal = {
            value:state.grid[i][x],
            locked:true,
            candidates:candidates[i][x],
            selected:false
          };
          if(state.grid[i][x] === '.') {
            newVal.value = '';
            newVal.locked = false;
          }
          state.grid[i][x] = newVal;
        }
      }
    },
    setSelected(state, pos) {
     for(let i=0;i<state.grid.length;i++) {
       let row = state.grid[i];
       for(let x=0;x<row.length;x++) {
         if((i !== pos.x || x !== pos.y) && row[x].selected) { 
           row[x].selected = false;
         }
         if(i === pos.x && x === pos.y) {
           row[x].selected = true;
         }
       }
       Vue.set(state.grid, i, row);
     }
    }
  },
  actions: {
  },
  modules: {
  }
})